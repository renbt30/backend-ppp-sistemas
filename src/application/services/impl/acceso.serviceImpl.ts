import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { AccesoService } from '../interfaces/acceso.service';
import { Acceso } from 'src/domain/entities/acceso';
import { CreateAccesoDto, UpdateAccesoDto } from 'src/presentation/dto/acceso.dto';

@Injectable()
export class AccesoServiceImpl implements AccesoService {

    constructor(
        @InjectRepository(Acceso)
        private readonly accesoRepository: Repository<Acceso>
    ) {
    
    }

    async getAllAcceso(): Promise<Acceso[]> {
        return await this.accesoRepository.find();
    }

    async getAccesoById(id: number): Promise<Acceso> {
        const acceso = await this.accesoRepository.findOne({
            where: [{
                id_acceso: id
            }]
        });

        if (!acceso) {
            throw new BadRequestException(`No se encontró el acceso`);
        }

        return acceso;
    }

    async createAcceso(createAccesoDto: CreateAccesoDto): Promise<Acceso> {
        const acceso = await this.accesoRepository.save({
            ...createAccesoDto,
            dt_creacion: new Date()
        })

        return acceso;
    }

    async updateAcceso(id: number, updateAccesoDto: UpdateAccesoDto): Promise<UpdateResult> {
        const updateResult = await this.accesoRepository.update(id, updateAccesoDto);

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró el rol`);
        }

        return updateResult;
    }

    async deleteAcceso(id: number): Promise<UpdateResult> {
        return null;
    }
    
}