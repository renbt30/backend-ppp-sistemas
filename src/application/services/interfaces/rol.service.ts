import { Rol } from "src/domain/entities/rol";
import { CreateRolDto, UpdateRolDto } from "src/presentation/dto/rol.dto";
import { UpdateResult } from "typeorm";

export interface RolService {
    getAllRol(): Promise<Rol[]>;
    getRolById(id: number): Promise<Rol>;
    createRol(createRolDto: CreateRolDto): Promise<Rol>;
    updateRol(id: number, updateRolDto: UpdateRolDto): Promise<UpdateResult>;
    deleteRol(id: number): Promise<UpdateResult>;
}