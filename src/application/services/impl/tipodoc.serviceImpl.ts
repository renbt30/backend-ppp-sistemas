import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { TipoDocService } from '../interfaces/tipodoc.service';
import { TipoDoc } from 'src/domain/entities/tipodoc';
import { CreateTipoDocDto, UpdateTipoDocDto } from 'src/presentation/dto/tipodoc.dto';

@Injectable()
export class TipoDocServiceImpl implements TipoDocService {

    constructor(
        @InjectRepository(TipoDoc)
        private readonly tipoDocRepository: Repository<TipoDoc>
    ) {
    
    }

    async getAllTipoDoc(): Promise<TipoDoc[]> {
        return await this.tipoDocRepository.find();
    }

    async getTipoDocById(id: number): Promise<TipoDoc> {
        const tipoDoc = await this.tipoDocRepository.findOne({
            where: [{
                id_tipodoc: id
            }]
        });

        if (!tipoDoc) {
            throw new BadRequestException(`No se encontró el tipo de documento`);
        }

        return tipoDoc;
    }

    async createTipoDoc(createTipoDocDto: CreateTipoDocDto): Promise<TipoDoc> {
        const tipoDoc = await this.tipoDocRepository.save(createTipoDocDto)

        return tipoDoc;
    }

    async updateTipoDoc(id: number, updateTipoDocDto: UpdateTipoDocDto): Promise<UpdateResult> {
        const updateResult = await this.tipoDocRepository.update(id, updateTipoDocDto);

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró el tipo de documento`);
        }

        return updateResult;
    }

    async deleteTipoDoc(id: number): Promise<UpdateResult> {
        return null;
    }
    
}