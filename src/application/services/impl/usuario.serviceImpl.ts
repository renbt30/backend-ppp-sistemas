import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UsuarioService } from '../interfaces/usuario.service';
import { Usuario } from 'src/domain/entities/usuario';
import { CreateUsuarioDto, UpdateUsuarioDto } from 'src/presentation/dto/usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioServiceImpl implements UsuarioService {

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>
    ) {
    
    }

    async getAllUsuario(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();
    }

    async getUsuarioById(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: [{
                id_usuario: id
            }]
        });

        if (!usuario) {
            throw new BadRequestException(`No se encontró el usuario`);
        }

        return usuario;
    }

    async createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {

        const isUserExist = await this.validarUsuario(createUsuarioDto.num_doc, createUsuarioDto.correo, createUsuarioDto.usuario);

        if (!isUserExist) {

            const hashedPassword = await bcrypt.hash(createUsuarioDto.clave, 10);
            const usuario = await this.usuarioRepository.save({
                ...createUsuarioDto,
                clave: hashedPassword,
                dt_creacion: new Date()
            })

            return usuario;

        } else {
            throw new BadRequestException('El usuario ya existe');
        }
    }

    async updateUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<UpdateResult> {
        const updateResult = await this.usuarioRepository.update(id, updateUsuarioDto);

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró el usuario`);
        }

        return updateResult;
    }

    async deleteUsuario(id: number): Promise<UpdateResult> {
        const updateResult = await this.usuarioRepository.update(id,{
            estado: '0'
        });

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró el usuario`);
        }

        return updateResult;
    }

    async validarUsuario(num_doc: string, correo: string, usuario: string): Promise<Boolean> {
        
        const user = await this.usuarioRepository.findOne({
            where: [{
                num_doc: num_doc,
                correo: correo,
                usuario: usuario
            }]
        });

        if (user) {
            return true;
        }

        return false;
    }
}