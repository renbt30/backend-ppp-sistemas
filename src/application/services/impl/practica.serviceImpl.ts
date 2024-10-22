import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PracticaService } from '../interfaces/practica.service';
import { Practica } from 'src/domain/entities/practica';
import { CreatePracticaDto, UpdatePracticaDto } from 'src/presentation/dto/practica.dto';

@Injectable()
export class PracticaServiceImpl implements PracticaService {

    constructor(
        @InjectRepository(Practica)
        private readonly practicaRepository: Repository<Practica>
    ) {
    
    }

    async getAllPractica(): Promise<Practica[]> {
        return await this.practicaRepository.find();
    }

    async getPracticaById(id: number): Promise<Practica> {
        const practica = await this.practicaRepository.findOne({
            where: [{
                id_practica: id
            }]
        });

        if (!practica) {
            throw new BadRequestException(`No se encontró la practica`);
        }

        return practica;
    }

    async createPractica(createPracticaDto: CreatePracticaDto): Promise<Practica> {
        const practica = await this.practicaRepository.save({
            ...createPracticaDto,
            dt_creacion: new Date()
        })

        return practica;
    }

    async updatePractica(id: number, updatePracticaDto: UpdatePracticaDto): Promise<UpdateResult> {
        const updateResult = await this.practicaRepository.update(id, updatePracticaDto);

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró la practica`);
        }

        return updateResult;
    }

    async deletePractica(id: number): Promise<UpdateResult> {
        return null;
    }
    
}