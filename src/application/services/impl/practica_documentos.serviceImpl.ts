import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PracticaDocumentosService } from '../interfaces/practica_documentos.service';
import { PracticaDocumentos } from 'src/domain/entities/practica_documentos';
import { CreatePracticaDocumentosDto, UpdatePracticaDocumentosDto } from 'src/presentation/dto/practica_documentos.dto';

@Injectable()
export class PracticaDocumentosServiceImpl implements PracticaDocumentosService {

    constructor(
        @InjectRepository(PracticaDocumentos)
        private readonly practicaDocumentosRepository: Repository<PracticaDocumentos>
    ) {
    
    }

    async getAllPracticaDocumentos(): Promise<PracticaDocumentos[]> {
        return await this.practicaDocumentosRepository.find();
    }

    async getPracticaDocumentosById(id: number): Promise<PracticaDocumentos> {
        const practicaDocumentos = await this.practicaDocumentosRepository.findOne({
            where: [{
                id_prcdocumento: id
            }]
        });

        if (!practicaDocumentos) {
            throw new BadRequestException(`No se encontró el documento de la práctica`);
        }

        return practicaDocumentos;
    }

    async createPracticaDocumentos(createPracticaDocumentosDto: CreatePracticaDocumentosDto): Promise<PracticaDocumentos> {
        const practicaDocumentos = await this.practicaDocumentosRepository.save({
            ...createPracticaDocumentosDto,
            dt_reg: new Date()
        })

        return practicaDocumentos;
    }

    async updatePracticaDocumentos(id: number, updatePracticaDocumentosDto: UpdatePracticaDocumentosDto): Promise<UpdateResult> {
        const updateResult = await this.practicaDocumentosRepository.update(id, updatePracticaDocumentosDto);

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró el documento de la práctica`);
        }

        return updateResult;
    }

    async deletePracticaDocumentos(id: number): Promise<UpdateResult> {
        const updateResult = await this.practicaDocumentosRepository.update(id,{
            estado: '0'
        });

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró el documento de la práctica`);
        }

        return updateResult;
    }
    
}