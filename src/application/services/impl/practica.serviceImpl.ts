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
        private readonly practicaRepository: Repository<Practica>
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
            `Select p.*, pl.nm_prclinea as linea, us.nombre as supervisor, pe.nm_prcestado AS estado_practica
                from practica p
                inner join solicitud s on s.id_solicitud = p.id_solicitud
                inner join usuario u on s.id_postulante = u.id_usuario
                inner join usuario us on p.id_superv = us.id_usuario
                inner join practica_estado pe on pe.id_prcestado = p.id_prcestado
                inner join practica_linea pl on pl.id_prclinea = p.id_prclinea
            where s.id_postulante = ?;`,
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
                END AS estado_documento
            from practica_documentos pd
            inner join practica p on p.id_practica = pd.id_practica
            inner join solicitud s on s.id_solicitud = p.id_solicitud
            inner join practica_tipodoc pt on pt.id_prctipodoc = pd.id_prctipodoc
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
            `Select p.*, pl.nm_prclinea as linea, us.nombre as supervisor, pe.nm_prcestado AS estado_practica, u.nombre as postulante
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
        const result = await this.practicaRepository.query(
            `SELECT 
                (SELECT COUNT(*) 
                FROM solicitud 
                WHERE estado IN (0, 1)) AS numero_solicitudes,
                (SELECT COUNT(*) 
                FROM practica 
                WHERE id_prclinea IN (1, 2, 3, 4)) AS numero_practicantes,
                (SELECT COUNT(*) 
                FROM practica 
                WHERE id_prclinea = 5) AS numero_practicantes;`
        );

        if (!result) {
            throw new BadRequestException(`No se encontró la practica`);
        }

        return result;
    }
    
}