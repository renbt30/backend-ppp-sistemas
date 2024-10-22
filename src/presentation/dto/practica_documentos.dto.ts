import { PartialType } from "@nestjs/mapped-types";

export class PracticaDocumentosDto {
    id_prcdocumento: number;
    id_practica: number;
    id_prctipodoc: number;
    file_name: string;
    file_link: string;
    dt_reg: Date;
    estado: string;
    observacion: string;
    id_usuariorev: number;
}

export class CreatePracticaDocumentosDto {
    id_practica: number;
    id_prctipodoc: number;
    file_name: string;
    file_link: string;
    estado: string;
    observacion: string;
    id_usuariorev: number;
}

export class UpdatePracticaDocumentosDto extends PartialType(CreatePracticaDocumentosDto) { }