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

    async getSolicitudesByPostulanteId(id: number): Promise<Object[]> {
        
        const result = await this.solicitudRepository.query(
            `SELECT 
                s.*,
                pl.nm_prclinea,
                CASE s.estado
                    WHEN 0 THEN 'Registrado'
                    WHEN 1 THEN 'Validado'
                    WHEN 2 THEN 'Rechazado'
                END AS estado_solicitud,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'nombre', sc.nombre,
                        'celular', sc.celular,
                        'correo', sc.correo,
                        'tipo_contacto', st.nm_tipocontacto
                    )
                ) AS contactos
            FROM solicitud s
            INNER JOIN practica_linea pl ON pl.id_prclinea = s.id_prclinea
            INNER JOIN solicitud_contacto sc ON sc.id_solicitud = s.id_solicitud
            INNER JOIN solicitud_tipocontacto st ON st.id_tipocontacto = sc.id_tipocontacto
            WHERE s.id_postulante = ?
            GROUP BY s.id_solicitud;`,
            [id]
        );

        if (!result) {
            throw new BadRequestException(`No se encontraron solicitudes`);
        }

        return result;
    }

    async getSolicitudesByEstado(estado: string): Promise<Object[]> {
        
        const result = await this.solicitudRepository.query(
            `SELECT 
		        s.*,
                pl.nm_prclinea,
				   u.nombre,
				   u.correo,
                CASE s.estado
                    WHEN 0 THEN 'Registrado'
                    WHEN 1 THEN 'Validado'
                    WHEN 2 THEN 'Rechazado'
                END AS estado_solicitud,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'nombre', sc.nombre,
                        'celular', sc.celular,
                        'correo', sc.correo,
                        'tipo_contacto', st.nm_tipocontacto
                    )
                ) AS contactos
            FROM solicitud s
            INNER JOIN practica_linea pl ON pl.id_prclinea = s.id_prclinea
            INNER JOIN solicitud_contacto sc ON sc.id_solicitud = s.id_solicitud
            INNER JOIN solicitud_tipocontacto st ON st.id_tipocontacto = sc.id_tipocontacto
            INNER JOIN usuario u on u.id_usuario = s.id_postulante
            WHERE s.estado = ?
            GROUP BY s.id_solicitud;`,
            [estado]
        );

        if (!result) {
            throw new BadRequestException(`No se encontraron solicitudes`);
        }

        return result;
    }

    async getSolicitudesBySolicitudEstadoAndPracticaEstado(estado_solicitud: string, estado_practica: string): Promise<Object[]> {
        const result = await this.solicitudRepository.query(
            `Select s.*,
                pl.nm_prclinea,
                u.nombre,
                u.correo,
                u.usuario,
            CASE s.estado
                WHEN 0 THEN 'Registrado'
                WHEN 1 THEN 'Validado'
                WHEN 2 THEN 'Rechazado'
            END AS estado_solicitud
            from solicitud s
            inner join practica_linea pl on pl.id_prclinea = s.id_prclinea
            inner join usuario u on u.id_usuario = s.id_postulante
            inner join practica p on p.id_practica = s.id_solicitud
            where s.estado = ? AND p.id_prcestado = ?;`,
            [estado_solicitud, estado_practica]
        );

        if (!result) {
            throw new BadRequestException(`No se encontró la practica`);
        }

        return result;
    }

    async createSolicitud(createSolicitudDto: CreateSolicitudDto): Promise<Solicitud> {
        const solicitud = await this.solicitudRepository.save({
            ...createSolicitudDto,
            dt_creacion: new Date(),
            estado: '0',
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

    async addObservacion(id: number, observacion: string): Promise<UpdateResult> {
        const updateResult = await this.solicitudRepository.update(id, { observacion: observacion });

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró la solicitud`);
        }

        return updateResult;
    }
    
}