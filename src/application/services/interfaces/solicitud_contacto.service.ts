import { SolicitudContacto } from "src/domain/entities/solicitud_contacto";
import { CreateSolicitudContactoDto, UpdateSolicitudContactoDto } from "src/presentation/dto/solicitud_contacto.dto";
import { UpdateResult } from "typeorm";

export interface SolicitudContactoService {
    getAllSolicitudContacto(): Promise<SolicitudContacto[]>;
    getSolicitudContactoById(id: number): Promise<SolicitudContacto>;
    createSolicitudContacto(createSolicitudContactoDto: CreateSolicitudContactoDto): Promise<SolicitudContacto>;
    updateSolicitudContacto(id: number, updateSolicitudContactoDto: UpdateSolicitudContactoDto): Promise<UpdateResult>;
    deleteSolicitudContacto(id: number): Promise<UpdateResult>;
}