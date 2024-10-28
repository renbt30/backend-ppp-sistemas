import { PartialType } from "@nestjs/mapped-types";

export class PracticaTipoDocDto {
    id_prctipodoc: number;
    nm_prctipodoc: string;
    estado: string;
}

export class CreatePracticaTipoDocDto {
    nm_prctipodoc: string;
}

export class UpdatePracticaTipoDocDto extends PartialType(CreatePracticaTipoDocDto) { }