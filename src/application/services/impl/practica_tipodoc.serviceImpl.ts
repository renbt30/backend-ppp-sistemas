import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PracticaTipoDocService } from '../interfaces/practica_tipodoc.service';
import { PracticaTipoDoc } from 'src/domain/entities/practica_tipodoc';
import { CreatePracticaTipoDocDto, UpdatePracticaTipoDocDto } from 'src/presentation/dto/practica_tipodoc.dto';

@Injectable()
export class PracticaTipoDocServiceImpl implements PracticaTipoDocService {

    constructor(
        @InjectRepository(PracticaTipoDoc)
        private readonly practicaTipoDocRepository: Repository<PracticaTipoDoc>
    ) {
    
    }

    async getAllPracticaTipoDoc(): Promise<PracticaTipoDoc[]> {
        return await this.practicaTipoDocRepository.find();
    }

    async getPracticaTipoDocById(id: number): Promise<PracticaTipoDoc> {
        const practicaTipoDoc = await this.practicaTipoDocRepository.findOne({
            where: [{
                id_prctipodoc: id
            }]
        });

        if (!practicaTipoDoc) {
            throw new BadRequestException(`No se encontró el tipo de documento de práctica`);
        }

        return practicaTipoDoc;
    }

    async createPracticaTipoDoc(createPracticaTipoDocDto: CreatePracticaTipoDocDto): Promise<PracticaTipoDoc> {
        const practicaTipoDoc = await this.practicaTipoDocRepository.save(createPracticaTipoDocDto)

        return practicaTipoDoc;
    }

    async updatePracticaTipoDoc(id: number, updatePracticaTipoDocDto: UpdatePracticaTipoDocDto): Promise<UpdateResult> {
        const updateResult = await this.practicaTipoDocRepository.update(id, updatePracticaTipoDocDto);

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró el tipo de documento de práctica`);
        }

        return updateResult;
    }

    async deletePracticaTipoDoc(id: number): Promise<UpdateResult> {
        const updateResult = await this.practicaTipoDocRepository.update(id,{
            estado: '0'
        });

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró el tipo de documento de práctica`);
        }

        return updateResult;
    }
    
}