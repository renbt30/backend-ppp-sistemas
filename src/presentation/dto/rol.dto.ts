import { PartialType } from "@nestjs/mapped-types";

export class RolDto {
    id_rol: number;
    nm_rol: string;
    tipo_rol: string;
    estado: string;
    dt_creacion: Date;
}

export class CreateRolDto {
    nm_rol: string;
    tipo_rol: string;
    estado: string;
}

export class UpdateRolDto extends PartialType(CreateRolDto) {}