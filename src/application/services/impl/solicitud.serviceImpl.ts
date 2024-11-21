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

    async getSolicitudByPostulanteId(id: number): Promise<Object[]> {
        
        const result = await this.solicitudRepository.query(
            `Select s.*,
	        pl.nm_prclinea,
            CASE s.estado
                WHEN 0 THEN 'Solicitud registrada'
                WHEN 1 THEN 'Solicitud validada'
                WHEN 2 THEN 'Solicitud rechazada'
            END AS estado_solicitud
            from solicitud s
            inner join practica_linea pl on pl.id_prclinea = s.id_prclinea
            inner join usuario u on u.id_usuario = s.id_postulante
            where id_postulante = ?;`,
            [id]
        );

        if (!result) {
            throw new BadRequestException(`No se encontraron solicitudes`);
        }

        return result;
    }

    async getSolicitudByEstado(estado: string): Promise<Object[]> {
        
        const result = await this.solicitudRepository.query(
            `Select s.*,
                pl.nm_prclinea,
                u.nombre,
                u.correo,
            CASE s.estado
                WHEN 0 THEN 'Solicitud registrada'
                WHEN 1 THEN 'Solicitud validada'
                WHEN 2 THEN 'Solicitud rechazada'
            END AS estado_solicitud
            from solicitud s
            inner join practica_linea pl on pl.id_prclinea = s.id_prclinea
            inner join usuario u on u.id_usuario = s.id_postulante
            where s.estado = ?;`,
            [estado]
        );

        if (!result) {
            throw new BadRequestException(`No se encontraron solicitudes`);
        }

        return result;
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

    async updateEstadoSolicitud(id: number, estado: string): Promise<UpdateResult> {
        const updateResult = await this.solicitudRepository.update(id, { estado: estado });

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró la solicitud`);
        }

        return updateResult;
    }
    
}