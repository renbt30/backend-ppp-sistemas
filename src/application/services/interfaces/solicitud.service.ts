import { Solicitud } from "src/domain/entities/solicitud";
import { CreateSolicitudDto, UpdateSolicitudDto } from "src/presentation/dto/solicitud.dto";
import { UpdateResult } from "typeorm";

export interface SolicitudService {
    getAllSolicitud(): Promise<Solicitud[]>;
    getSolicitudById(id: number): Promise<Solicitud>;
    getSolicitudesByPostulanteId(id: number): Promise<Object[]>;
    getSolicitudesByEstado(estado: string): Promise<Object[]>;
    getSolicitudesBySolicitudEstadoAndPracticaEstado(estado_solicitud: string, estado_practica: string): Promise<Object[]>;
    createSolicitud(createSolicitudDto: CreateSolicitudDto): Promise<Solicitud>;
    updateSolicitud(id: number, updateSolicitudDto: UpdateSolicitudDto): Promise<UpdateResult>;
    deleteSolicitud(id: number): Promise<UpdateResult>;
    updateEstadoSolicitud(id: number, estado: string): Promise<UpdateResult>;
}