import { PartialType } from "@nestjs/mapped-types";

export class UsuarioDto {
    id_usuario: number;
    id_rol: number;
    id_tipodoc: number;
    num_doc: string;
    nombre: string;
    correo: string;
    usuario: string;
    clave: string;
    estado: string;
    dt_creacion: Date;
}

export class CreateUsuarioDto {
    id_rol: number;
    id_tipodoc: number;
    num_doc: string;
    nombre: string;
    correo: string;
    usuario: string;
    clave: string;
    estado: string;
}

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}