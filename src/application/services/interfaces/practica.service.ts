import { Practica } from "src/domain/entities/practica";
import { CreatePracticaDto, UpdatePracticaDto } from "src/presentation/dto/practica.dto";
import { UpdateResult } from "typeorm";

export interface PracticaService {
    getAllPractica(): Promise<Practica[]>;
    getPracticaById(id: number): Promise<Practica>;
    createPractica(createPracticaDto: CreatePracticaDto): Promise<Practica>;
    updatePractica(id: number, updatePracticaDto: UpdatePracticaDto): Promise<UpdateResult>;
    deletePractica(id: number): Promise<UpdateResult>;
}