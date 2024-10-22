import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/domain/entities/rol';
import { RolService } from '../interfaces/rol.service';
import { CreateRolDto, UpdateRolDto } from 'src/presentation/dto/rol.dto';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class RolServiceImpl implements RolService {

    constructor(
        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>
    ) {
    }

    async getAllRol(): Promise<Rol[]> {
        return await this.rolRepository.find();
    }

    async getRolById(id: number): Promise<Rol> {
        const rol = await this.rolRepository.findOne({
            where: [{
                id_rol: id
            }]
        });

        if (!rol) {
            throw new BadRequestException(`No se encontró el rol`);
        }

        return rol;
    }

    async createRol(createRolDto: CreateRolDto): Promise<Rol> {
        const rol = await this.rolRepository.save({
            ...createRolDto,
            dt_creacion: new Date()
        })

        return rol;
    }

    async updateRol(id: number, updateRolDto: UpdateRolDto): Promise<UpdateResult> {
        const updateResult = await this.rolRepository.update(id, updateRolDto);

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró el rol`);
        }

        return updateResult;
    }

    
    async deleteRol(id: number): Promise<UpdateResult> {
        const updateResult = await this.rolRepository.update(id,{
            estado: '0'
        });

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró el rol`);
        }

        return updateResult;
    }
    
}