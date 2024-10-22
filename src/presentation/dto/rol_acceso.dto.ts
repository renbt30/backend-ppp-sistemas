import { PartialType } from "@nestjs/mapped-types";

export class RolAccesoDto {
    id_rol: number;
    id_acceso: string;
}

export class CreateRolAccesoDto {
    id_rol: number;
    id_acceso: string;
}

export class UpdateRolAccesoDto extends PartialType(CreateRolAccesoDto) {}