import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { SolicitudTipoContactoService } from '../interfaces/solicitud_tipocontacto.service';
import { SolicitudTipoContacto } from 'src/domain/entities/solicitud_tipocontacto';
import { CreateSolicitudTipoContactoDto, UpdateSolicitudTipoContactoDto } from 'src/presentation/dto/solicitud_tipocontacto.dto';

@Injectable()
export class SolicitudTipoContactoServiceImpl implements SolicitudTipoContactoService {

    constructor(
        @InjectRepository(SolicitudTipoContacto)
        private readonly solicitudTipoContactoRepository: Repository<SolicitudTipoContacto>
    ) {
    
    }

    async getAllSolicitudTipoContacto(): Promise<SolicitudTipoContacto[]> {
        return await this.solicitudTipoContactoRepository.find();
    }

    async getSolicitudTipoContactoById(id: number): Promise<SolicitudTipoContacto> {
        const solicitudTipoContacto = await this.solicitudTipoContactoRepository.findOne({
            where: [{
                id_tipocontacto: id
            }]
        });

        if (!solicitudTipoContacto) {
            throw new BadRequestException(`No se encontró el tipo de contacto`);
        }

        return solicitudTipoContacto;
    }

    async createSolicitudTipoContacto(createSolicitudTipoContactoDto: CreateSolicitudTipoContactoDto): Promise<SolicitudTipoContacto> {
        const solicitudTipoContacto = await this.solicitudTipoContactoRepository.save(createSolicitudTipoContactoDto)

        return solicitudTipoContacto;
    }

    async updateSolicitudTipoContacto(id: number, updateSolicitudTipoContactoDto: UpdateSolicitudTipoContactoDto): Promise<UpdateResult> {
        const updateResult = await this.solicitudTipoContactoRepository.update(id, updateSolicitudTipoContactoDto);

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró el tipo de contacto`);
        }

        return updateResult;
    }

    async deleteSolicitudTipoContacto(id: number): Promise<UpdateResult> {
        const updateResult = await this.solicitudTipoContactoRepository.update(id,{
            estado: '0'
        });

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró el tipo de contacto`);
        }

        return updateResult;
    }
    
}