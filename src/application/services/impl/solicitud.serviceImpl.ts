import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { SolicitudService } from '../interfaces/solicitud.service';
import { Solicitud } from 'src/domain/entities/solicitud';
import { CreateSolicitudDto, UpdateSolicitudDto } from 'src/presentation/dto/solicitud.dto';

@Injectable()
export class SolicitudServiceImpl implements SolicitudService {

    constructor(
        @InjectRepository(Solicitud)
        private readonly solicitudRepository: Repository<Solicitud>
    ) {
    
    }

    async getAllSolicitud(): Promise<Solicitud[]> {
        return await this.solicitudRepository.find();
    }

    async getSolicitudById(id: number): Promise<Solicitud> {
        const solicitud = await this.solicitudRepository.findOne({
            where: [{
                id_solicitud: id
            }]
        });

        if (!solicitud) {
            throw new BadRequestException(`No se encontró la solicitud`);
        }

        return solicitud;
    }

    async createSolicitud(createSolicitudDto: CreateSolicitudDto): Promise<Solicitud> {
        const solicitud = await this.solicitudRepository.save({
            ...createSolicitudDto,
            dt_creacion: new Date()
        })

        return solicitud;
    }

    async updateSolicitud(id: number, updateSolicitudDto: UpdateSolicitudDto): Promise<UpdateResult> {
        const updateResult = await this.solicitudRepository.update(id, updateSolicitudDto);

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró la solicitud`);
        }

        return updateResult;
    }

    async deleteSolicitud(id: number): Promise<UpdateResult> {
        const updateResult = await this.solicitudRepository.update(id,{
            estado: '0'
        });

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró la solicitud`);
        }

        return updateResult;
    }
    
}