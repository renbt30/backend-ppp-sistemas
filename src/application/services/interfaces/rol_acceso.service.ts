import { RolAcceso } from "src/domain/entities/rol_acceso";
import { CreateRolAccesoDto, UpdateRolAccesoDto } from "src/presentation/dto/rol_acceso.dto";
import { UpdateResult } from "typeorm";

export interface RolAccesoService {
    getAllRolAcceso(): Promise<RolAcceso[]>;
    getRolAccesoByRolId(id: number): Promise<RolAcceso>;
    createRolAcceso(createRolAccesoDto: CreateRolAccesoDto): Promise<RolAcceso>;
    updateRolAcceso(id: number, updateRolAccesoDto: UpdateRolAccesoDto): Promise<UpdateResult>;
    deleteRolAcceso(id: number): Promise<UpdateResult>;
}