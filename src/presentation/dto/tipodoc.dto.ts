import { PartialType } from "@nestjs/mapped-types";

export class TipoDocDto {
    id_tipodoc: number;
    nm_tipodoc: string;
    abreviatura: string;
}

export class CreateTipoDocDto {
    nm_tipodoc: string;
    abreviatura: string;
}

export class UpdateTipoDocDto extends PartialType(CreateTipoDocDto) {}