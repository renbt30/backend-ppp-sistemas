import { PracticaEstado } from "src/domain/entities/practica_estado";
import { CreatePracticaEstadoDto, UpdatePracticaEstadoDto } from "src/presentation/dto/practica_estado.dto";
import { UpdateResult } from "typeorm";

export interface PracticaEstadoService {
    getAllPracticaEstado(): Promise<PracticaEstado[]>;
    getPracticaEstadoById(id: number): Promise<PracticaEstado>;
    createPracticaEstado(createPracticaEstadoDto: CreatePracticaEstadoDto): Promise<PracticaEstado>;
    updatePracticaEstado(id: number, updatePracticaEstadoDto: UpdatePracticaEstadoDto): Promise<UpdateResult>;
    deletePracticaEstado(id: number): Promise<UpdateResult>;
}