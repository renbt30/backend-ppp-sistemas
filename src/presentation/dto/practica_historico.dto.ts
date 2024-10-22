import { PartialType } from "@nestjs/mapped-types";

export class PracticaHistoricoDto {
    id_practica: number;
    id_usuariomov: number;
    id_prcestado: number;
    dt_mov: Date;
    observacion: string;
}

export class CreatePracticaHistoricoDto {
    id_usuariomov: number;
    id_prcestado: number;
    observacion: string;
}

export class UpdatePracticaHistoricoDto extends PartialType(CreatePracticaHistoricoDto) { }