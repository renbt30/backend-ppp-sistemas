import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PracticaHistoricoService } from '../interfaces/practica_historico.service';
import { PracticaHistorico } from 'src/domain/entities/practica_historico';
import { CreatePracticaHistoricoDto, UpdatePracticaHistoricoDto } from 'src/presentation/dto/practica_historico.dto';

@Injectable()
export class PracticaHistoricoServiceImpl implements PracticaHistoricoService {

    constructor(
        @InjectRepository(PracticaHistorico)
        private readonly practicaHistoricoRepository: Repository<PracticaHistorico>
    ) {
    
    }

    async getAllPracticaHistorico(): Promise<PracticaHistorico[]> {
        return await this.practicaHistoricoRepository.find();
    }

    async getPracticaHistoricoByPracticaId(id: number): Promise<PracticaHistorico> {
        const practicaHistorico = await this.practicaHistoricoRepository.findOne({
            where: [{
                id_practica: id
            }]
        });

        if (!practicaHistorico) {
            throw new BadRequestException(`No se encontró el histórico de la práctica`);
        }

        return practicaHistorico;
    }

    async createPracticaHistorico(createPracticaHistoricoDto: CreatePracticaHistoricoDto): Promise<PracticaHistorico> {
        const practicaHistorico = await this.practicaHistoricoRepository.save(createPracticaHistoricoDto)

        return practicaHistorico;
    }

    async updatePracticaHistorico(id: number, updatePracticaHistoricoDto: UpdatePracticaHistoricoDto): Promise<UpdateResult> {
        return null;
    }

    async deletePracticaHistorico(id: number): Promise<UpdateResult> {
        return null;
    }
    
}