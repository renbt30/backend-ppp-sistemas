import { PartialType } from "@nestjs/mapped-types";

export class PracticaEstadoDto {
    id_prcestado: number;
    nm_prcestado: string;
}

export class CreatePracticaEstadoDto {
    nm_prcestado: string;
}

export class UpdatePracticaEstadoDto extends PartialType(CreatePracticaEstadoDto) { }