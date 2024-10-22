import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PracticaLineaService } from '../interfaces/practica_linea.service';
import { PracticaLinea } from 'src/domain/entities/practica_linea';
import { CreatePracticaLineaDto, UpdatePracticaLineaDto } from 'src/presentation/dto/practica_linea.dto';

@Injectable()
export class PracticaLineaServiceImpl implements PracticaLineaService {

    constructor(
        @InjectRepository(PracticaLinea)
        private readonly practicaLineaRepository: Repository<PracticaLinea>
    ) {
    
    }

    async getAllPracticaLinea(): Promise<PracticaLinea[]> {
        return await this.practicaLineaRepository.find();
    }

    async getPracticaLineaById(id: number): Promise<PracticaLinea> {
        const practicaLinea = await this.practicaLineaRepository.findOne({
            where: [{
                id_prclinea: id
            }]
        });

        if (!practicaLinea) {
            throw new BadRequestException(`No se encontró la línea de práctica`);
        }

        return practicaLinea;
    }

    async createPracticaLinea(createPracticaLineaDto: CreatePracticaLineaDto): Promise<PracticaLinea> {
        const practicaLinea = await this.practicaLineaRepository.save(createPracticaLineaDto)

        return practicaLinea;
    }

    async updatePracticaLinea(id: number, updatePracticaLineaDto: UpdatePracticaLineaDto): Promise<UpdateResult> {
        const updateResult = await this.practicaLineaRepository.update(id, updatePracticaLineaDto);

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró la línea de práctica`);
        }

        return updateResult;
    }

    async deletePracticaLinea(id: number): Promise<UpdateResult> {
        return null;
    }
    
}