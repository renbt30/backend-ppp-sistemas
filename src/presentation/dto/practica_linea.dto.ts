import { PartialType } from "@nestjs/mapped-types";

export class PracticaLineaDto {
    id_prclinea: number;
    nm_prclinea: string;
}

export class CreatePracticaLineaDto {
    nm_prclinea: string;
}

export class UpdatePracticaLineaDto extends PartialType(CreatePracticaLineaDto) { }