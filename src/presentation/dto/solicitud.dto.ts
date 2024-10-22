import { PartialType } from "@nestjs/mapped-types";

export class SolicitudDto {
    id_solicitud: number;
    id_prclinea: number;
    id_postulante: number;
    empresa_ruc: string;
    empresa_nombre: string;
    dt_prcinicio: Date;
    dt_prcfin: Date;
    desc_actividades: string;
    dt_creacion: Date;
    estado: string;
    id_usuariorev: number;
    observacion: string;
}

export class CreateSolicitudDto {
    id_prclinea: number;
    id_postulante: number;
    empresa_ruc: string;
    empresa_nombre: string;
    dt_prcinicio: Date;
    dt_prcfin: Date;
    desc_actividades: string;
    estado: string;
    id_usuariorev: number;
    observacion: string;
}

export class UpdateSolicitudDto extends PartialType(CreateSolicitudDto) {}