import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { RolAccesoService } from '../interfaces/rol_acceso.service';
import { RolAcceso } from 'src/domain/entities/rol_acceso';
import { CreateRolAccesoDto, UpdateRolAccesoDto } from 'src/presentation/dto/rol_acceso.dto';

@Injectable()
export class RolAccesoServiceImpl implements RolAccesoService {

    constructor(
        @InjectRepository(RolAcceso)
        private readonly rolAccesoRepository: Repository<RolAcceso>
    ) {
    
    }

    async getAllRolAcceso(): Promise<RolAcceso[]> {
        return await this.rolAccesoRepository.find();
    }

    async getRolAccesoByRolId(id: number): Promise<RolAcceso> {
        const rolAcceso = await this.rolAccesoRepository.findOne({
            where: [{
                id_rol: id
            }]
        });

        if (!rolAcceso) {
            throw new BadRequestException(`No se encontró el rol acceso`);
        }

        return rolAcceso;
    }

    async createRolAcceso(createRolAccesoDto: CreateRolAccesoDto): Promise<RolAcceso> {
        const acceso = await this.rolAccesoRepository.save(createRolAccesoDto);

        return acceso;
    }

    async updateRolAcceso(id: number, updateRolAccesoDto: UpdateRolAccesoDto): Promise<UpdateResult> {
       return null;
    }

    async deleteRolAcceso(id: number): Promise<UpdateResult> {
        return null;
    }
    
}