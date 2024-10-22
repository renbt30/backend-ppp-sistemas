import { PartialType } from "@nestjs/mapped-types";

export class PracticaTipoDocDto {
    id_prclinea: number;
    nm_prclinea: string;
    estado: string;
}

export class CreatePracticaTipoDocDto {
    nm_prclinea: string;
    estado: string;
}

export class UpdatePracticaTipoDocDto extends PartialType(CreatePracticaTipoDocDto) { }