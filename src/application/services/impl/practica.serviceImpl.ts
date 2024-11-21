import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PracticaService } from '../interfaces/practica.service';
import { Practica } from 'src/domain/entities/practica';
import { CreatePracticaDto, UpdatePracticaDto } from 'src/presentation/dto/practica.dto';

@Injectable()
export class PracticaServiceImpl implements PracticaService {

    constructor(
        @InjectRepository(Practica)
        private readonly practicaRepository: Repository<Practica>,
    ) {
    
    }

    async getAllPractica(): Promise<Practica[]> {
        return await this.practicaRepository.find();
    }

    async getPracticaById(id: number): Promise<Practica> {
        const practica = await this.practicaRepository.findOne({
            where: [{
                id_practica: id
            }]
        });

        if (!practica) {
            throw new BadRequestException(`No se encontró la practica`);
        }

        return practica;
    }

    /*
    async getPracticasByPostulantes(): Promise<Object[]> {
        const result = await this.practicaRepository.query(
            `Select p.*, pe.nm_prcestado AS estado_practica, u.nombre
            from practica p
            inner join solicitud s on s.id_solicitud = p.id_solicitud
            inner join usuario u on s.id_postulante = u.id_usuario
            inner join practica_estado pe on pe.id_prcestado = p.id_prcestado;`,
        );

        if (!result) {
            throw new BadRequestException(`No se encontraron practicas`);
        }

        return result;
    }
    */
    

    async getPracticasByPostulanteId(id: number): Promise<Object[]> {
        const result = await this.practicaRepository.query(
            `Select p.*,
                s.empresa_ruc,
                s.empresa_nombre,
                s.dt_prcinicio, 
                s.dt_prcfin,
                pl.nm_prclinea as linea, 
                us.nombre as supervisor, 
                pe.nm_prcestado AS estado_practica
                    from practica p
                    inner join solicitud s on s.id_solicitud = p.id_solicitud
                    inner join usuario u on s.id_postulante = u.id_usuario
                    inner join usuario us on p.id_superv = us.id_usuario
                    inner join practica_estado pe on pe.id_prcestado = p.id_prcestado
                    inner join practica_linea pl on pl.id_prclinea = p.id_prclinea
                where s.id_postulante = ?`,
            [id]
        );

        if (!result) {
            throw new BadRequestException(`No se encontró la practica`);
        }

        return result;
    }


    async getDetallePracticaByPracticaId(id: number): Promise<Object> {
        const result = await this.practicaRepository.query(
            `Select pd.*,
                pt.nm_prctipodoc AS tipo_documento,
                CASE pd.estado
                    WHEN 1 THEN 'Subido'
                    WHEN 2 THEN 'Revisado'
                    WHEN 3 THEN 'Observado'
                    WHEN 4 THEN 'Rechazado'
                END AS estado_documento,
                p.id_prcestado,
                pe.nm_prcestado AS estado_practica
            from practica_documentos pd
            inner join practica p on p.id_practica = pd.id_practica
            inner join solicitud s on s.id_solicitud = p.id_solicitud
            inner join practica_tipodoc pt on pt.id_prctipodoc = pd.id_prctipodoc
            inner join practica_estado pe on pe.id_prcestado = p.id_prcestado
            where p.id_practica = ?;`,
            [id]
        );

        if (!result) {
            throw new BadRequestException(`No se encontró la practica`);
        }

        return result;
    }

    async getPracticasByEstado(estado: string): Promise<Object[]> {
        const result = await this.practicaRepository.query(
            `Select p.*,
                s.empresa_ruc,
                s.empresa_nombre,
                s.dt_prcinicio, 
                s.dt_prcfin, 
                pl.nm_prclinea as linea, 
                us.nombre as supervisor, 
                pe.nm_prcestado AS estado_practica,
                u.nombre as postulante
                from practica p
                inner join solicitud s on s.id_solicitud = p.id_solicitud
                inner join usuario u on s.id_postulante = u.id_usuario
                inner join usuario us on p.id_superv = us.id_usuario
                inner join practica_estado pe on pe.id_prcestado = p.id_prcestado
                inner join practica_linea pl on pl.id_prclinea = p.id_prclinea
                where pe.id_prcestado = ?;`,
            [estado]
        );

        if (!result) {
            throw new BadRequestException(`No se encontró la practica`);
        }

        return result;
    }

    async createPractica(createPracticaDto: CreatePracticaDto): Promise<Practica> {
        const practica = await this.practicaRepository.save({
            ...createPracticaDto,
            dt_mov: new Date()
        })

        return practica;
    }

    async updatePractica(id: number, updatePracticaDto: UpdatePracticaDto): Promise<UpdateResult> {
        const updateResult = await this.practicaRepository.update(id, updatePracticaDto);

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró la practica`);
        }

        return updateResult;
    }

    async deletePractica(id: number): Promise<UpdateResult> {
        return null;
    }

    async updateEstadoPractica(id: number, estado: number): Promise<UpdateResult> {
        const updateResult = await this.practicaRepository.update(id, { id_prcestado: estado });

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró la practica`);
        }

        return updateResult;
    }

    async getMetricas(): Promise<Object> {

        // Llamar al procedimiento almacenado
        const result = await this.practicaRepository.query(`
            CALL GetMetricas(@numero_solicitudes, @numero_practicantes, @numero_practicas_terminadas);
        `);

        // Obtener las variables de salida
        const output = await this.practicaRepository.query(`
            SELECT 
                @numero_solicitudes AS numero_solicitudes, 
                @numero_practicantes AS numero_practicantes, 
                @numero_practicas_terminadas AS numero_practicas_terminadas;
        `);

        if (!output || output.length === 0) {
            throw new BadRequestException('No se encontraron métricas');
        }

        // Retornar el resultado como objeto
        return {
            numeroSolicitudes: output[0].numero_solicitudes,
            numeroPracticantes: output[0].numero_practicantes,
            numeroPracticasTerminadas: output[0].numero_practicas_terminadas,
        };

    }

    async updateHorasAndNotaPractica(id: number, horas: number, nota: number): Promise<UpdateResult> {
        const updateResult = await this.practicaRepository.update(id, { 
            horas_validadas: horas,
            nota: nota
        });

        if (updateResult.affected === 0) {
            throw new BadRequestException(`No se encontró la practica`);
        }

        return updateResult;
    }
    
}