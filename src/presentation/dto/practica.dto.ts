import { PartialType } from "@nestjs/mapped-types";

export class PracticaDto {
    id_practica: number;
    id_prclinea: number;
    id_solicitud: number;
    id_prcestado: number;
    id_superv: number;
    horas_validadas: number;
    nota: number;
    id_usuariomov: number;
    dt_mov: Date;
}

export class CreatePracticaDto {
    id_prclinea: number;
    id_solicitud: number;
    id_prcestado: number;
    id_superv: number;
    horas_validadas: number;
    nota: number;
    id_usuariomov: number;
}

export class UpdatePracticaDto extends PartialType(CreatePracticaDto) { }