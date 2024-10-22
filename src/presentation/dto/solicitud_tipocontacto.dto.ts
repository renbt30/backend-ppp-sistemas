import { PartialType } from "@nestjs/mapped-types";

export class SolicitudTipoContactoDto {
    id_tipocontacto: number;
    nm_tipocontacto: string;
    estado: string;
}

export class CreateSolicitudTipoContactoDto {
    nm_tipocontacto: string;
    estado: string;
}

export class UpdateSolicitudTipoContactoDto extends PartialType(CreateSolicitudTipoContactoDto) {}