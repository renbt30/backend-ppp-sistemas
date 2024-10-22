import { SolicitudTipoContacto } from "src/domain/entities/solicitud_tipocontacto";
import { CreateSolicitudTipoContactoDto, UpdateSolicitudTipoContactoDto } from "src/presentation/dto/solicitud_tipocontacto.dto";
import { UpdateResult } from "typeorm";

export interface SolicitudTipoContactoService {
    getAllSolicitudTipoContacto(): Promise<SolicitudTipoContacto[]>;
    getSolicitudTipoContactoById(id: number): Promise<SolicitudTipoContacto>;
    createSolicitudTipoContacto(createSolicitudTipoContactoDto: CreateSolicitudTipoContactoDto): Promise<SolicitudTipoContacto>;
    updateSolicitudTipoContacto(id: number, updateSolicitudTipoContactoDto: UpdateSolicitudTipoContactoDto): Promise<UpdateResult>;
    deleteSolicitudTipoContacto(id: number): Promise<UpdateResult>;
}