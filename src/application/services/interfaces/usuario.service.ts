import { Usuario } from "src/domain/entities/usuario";
import { CreateUsuarioDto, UpdateUsuarioDto } from "src/presentation/dto/usuario.dto";
import { UpdateResult } from "typeorm";

export interface UsuarioService {
    getAllUsuario(): Promise<Usuario[]>;
    getUsuarioById(id: number): Promise<Usuario>;
    createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    updateUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<UpdateResult>;
    deleteUsuario(id: number): Promise<UpdateResult>;
    validarUsuario(num_doc:string, correo:string, usuario:string): Promise<Boolean>;
}