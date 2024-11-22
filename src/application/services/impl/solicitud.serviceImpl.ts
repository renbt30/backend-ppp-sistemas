import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { SolicitudService } from '../interfaces/solicitud.service';
import { Solicitud } from 'src/domain/entities/solicitud';
import { CreateSolicitudDto, UpdateSolicitudDto } from 'src/presentation/dto/solicitud.dto';
import { Practica } from 'src/domain/entities/practica';
import { PracticaDocumentos } from 'src/domain/entities/practica_documentos';

@Injectable()
export class SolicitudServiceImpl implements SolicitudService {

    constructor(
        @InjectRepository(Solicitud)
        private readonly solicitudRepository: Repository<Solicitud>,
        @InjectRepository(Practica)
        private readonly practicaRepository: Repository<Practica>,
        @InjectRepository(PracticaDocumentos)
        private readonly practicaDocumentosRepository: Repository<PracticaDocumentos>
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
            END AS estado_solicitud,
                p.id_practica
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

        await this.createPractica(solicitud.id_solicitud, solicitud.id_prclinea);

        return solicitud;
    }

    async createPractica(id_solicitud: number, id_prclinea: number): Promise<void> {
        const practica = await this.practicaRepository.save({
            id_solicitud: id_solicitud,
            id_prclinea: id_prclinea,
            id_prcestado: 1,
            horas_validadas: 0,
            nota: 0,
            id_usuariomov: 2,
            id_superv: 7,
            dt_mov: new Date()
        })

        await this.createRequisitosParaSubir(practica.id_practica, 1)
        await this.createRequisitosParaSubir(practica.id_practica, 2)
        await this.createRequisitosParaSubir(practica.id_practica, 3)
        await this.createRequisitosParaSubir(practica.id_practica, 4)
        await this.createRequisitosParaSubir(practica.id_practica, 5)
        await this.createRequisitosParaSubir(practica.id_practica, 6)
        await this.createRequisitosParaSubir(practica.id_practica, 7)
    }

    async updateSolicitud(id: number, updateSolicitudDto: UpdateSolicitudDto): Promise<UpdateResult> {
        const updateResult = await this.solicitudRepository.update(id, updateSolicitudDto);

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró la solicitud`);
        }

        return updateResult;
    }

    async createRequisitosParaSubir(id_practica: number, id_prctipodoc: number): Promise<void> {

        const practicaDocumentos = await this.practicaDocumentosRepository.save({
            id_practica: id_practica,
            id_prctipodoc: id_prctipodoc,
            estado: '0',
            id_usuariorev: 2
        })
        
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

        /*
        const solicitud = await this.solicitudRepository.findOne({
            where: [{
                id_solicitud: id
            }]
        });

        if (estado == '1') {
            await this.createPractica(id, solicitud.id_prclinea);
        }
        */

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