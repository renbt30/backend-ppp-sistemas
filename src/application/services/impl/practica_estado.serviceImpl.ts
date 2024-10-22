import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PracticaEstadoService } from '../interfaces/practica_estado.service';
import { PracticaEstado } from 'src/domain/entities/practica_estado';
import { CreatePracticaEstadoDto, UpdatePracticaEstadoDto } from 'src/presentation/dto/practica_estado.dto';

@Injectable()
export class PracticaEstadoServiceImpl implements PracticaEstadoService {

    constructor(
        @InjectRepository(PracticaEstado)
        private readonly practicaEstadoRepository: Repository<PracticaEstado>
    ) {
    
    }

    async getAllPracticaEstado(): Promise<PracticaEstado[]> {
        return await this.practicaEstadoRepository.find();
    }

    async getPracticaEstadoById(id: number): Promise<PracticaEstado> {
        const practicaEstado = await this.practicaEstadoRepository.findOne({
            where: [{
                id_prcestado: id
            }]
        });

        if (!practicaEstado) {
            throw new BadRequestException(`No se encontró el estado de práctica`);
        }

        return practicaEstado;
    }

    async createPracticaEstado(createPracticaEstadoDto: CreatePracticaEstadoDto): Promise<PracticaEstado> {
        const practicaEstado = await this.practicaEstadoRepository.save(createPracticaEstadoDto)

        return practicaEstado;
    }

    async updatePracticaEstado(id: number, updatePracticaEstadoDto: UpdatePracticaEstadoDto): Promise<UpdateResult> {
        const updateResult = await this.practicaEstadoRepository.update(id, updatePracticaEstadoDto);

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró el estado de práctica`);
        }

        return updateResult;
    }

    async deletePracticaEstado(id: number): Promise<UpdateResult> {
        return null;
    }
    
}