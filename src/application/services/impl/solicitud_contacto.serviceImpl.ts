import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { SolicitudContactoService } from '../interfaces/solicitud_contacto.service';
import { SolicitudContacto } from 'src/domain/entities/solicitud_contacto';
import { CreateSolicitudContactoDto, UpdateSolicitudContactoDto } from 'src/presentation/dto/solicitud_contacto.dto';

@Injectable()
export class SolicitudContactoServiceImpl implements SolicitudContactoService {

    constructor(
        @InjectRepository(SolicitudContacto)
        private readonly solicitudContactoRepository: Repository<SolicitudContacto>
    ) {
    
    }

    async getAllSolicitudContacto(): Promise<SolicitudContacto[]> {
        return await this.solicitudContactoRepository.find();
    }

    async getSolicitudContactoById(id: number): Promise<SolicitudContacto> {
        const solicitudContacto = await this.solicitudContactoRepository.findOne({
            where: [{
                id_solcontacto: id
            }]
        });

        if (!solicitudContacto) {
            throw new BadRequestException(`No se encontró el contacto de la solicitud`);
        }

        return solicitudContacto;
    }

    async createSolicitudContacto(createSolicitudContactoDto: CreateSolicitudContactoDto): Promise<SolicitudContacto> {
        const solicitudContacto = await this.solicitudContactoRepository.save(createSolicitudContactoDto)

        return solicitudContacto;
    }

    async updateSolicitudContacto(id: number, updateSolicitudContactoDto: UpdateSolicitudContactoDto): Promise<UpdateResult> {
        const updateResult = await this.solicitudContactoRepository.update(id, updateSolicitudContactoDto);

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró el contacto de la solicitud`);
        }

        return updateResult;
    }

    async deleteSolicitudContacto(id: number): Promise<UpdateResult> {
        return null;
    }
    
}