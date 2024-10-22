import { PartialType } from "@nestjs/mapped-types";

export class AccesoDto {
    id_acceso: number;
    nm_acceso: string;
    ruta: string;
    dt_creacion: Date;
}

export class CreateAccesoDto {
    nm_acceso: string;
    ruta: string;
}

export class UpdateAccesoDto extends PartialType(CreateAccesoDto) { }