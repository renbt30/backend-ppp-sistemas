import { Acceso } from "src/domain/entities/acceso";
import { CreateAccesoDto, UpdateAccesoDto } from "src/presentation/dto/acceso.dto";
import { UpdateResult } from "typeorm";

export interface AccesoService {
    getAllAcceso(): Promise<Acceso[]>;
    getAccesoById(id: number): Promise<Acceso>;
    createAcceso(createAccesoDto: CreateAccesoDto): Promise<Acceso>;
    updateAcceso(id: number, updateAccesoDto: UpdateAccesoDto): Promise<UpdateResult>;
    deleteAcceso(id: number): Promise<UpdateResult>;
}