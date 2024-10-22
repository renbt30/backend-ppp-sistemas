import { Solicitud } from "src/domain/entities/solicitud";
import { CreateSolicitudDto, UpdateSolicitudDto } from "src/presentation/dto/solicitud.dto";
import { UpdateResult } from "typeorm";

export interface SolicitudService {
    getAllSolicitud(): Promise<Solicitud[]>;
    getSolicitudById(id: number): Promise<Solicitud>;
    createSolicitud(createSolicitudDto: CreateSolicitudDto): Promise<Solicitud>;
    updateSolicitud(id: number, updateSolicitudDto: UpdateSolicitudDto): Promise<UpdateResult>;
    deleteSolicitud(id: number): Promise<UpdateResult>;
}