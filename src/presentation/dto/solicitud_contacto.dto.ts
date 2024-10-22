import { PartialType } from "@nestjs/mapped-types";

export class SolicitudContactoDto {
    id_solcontacto: number;
    id_solicitud: number;
    id_tipocontacto: number;
    nombre: string;
    celular: string;
    correo: string;
}

export class CreateSolicitudContactoDto {
    id_solicitud: number;
    id_tipocontacto: number;
    nombre: string;
    celular: string;
    correo: string;
}

export class UpdateSolicitudContactoDto extends PartialType(CreateSolicitudContactoDto) {}