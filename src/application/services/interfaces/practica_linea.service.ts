import { PracticaLinea } from "src/domain/entities/practica_linea";
import { CreatePracticaLineaDto, UpdatePracticaLineaDto } from "src/presentation/dto/practica_linea.dto";
import { UpdateResult } from "typeorm";

export interface PracticaLineaService {
    getAllPracticaLinea(): Promise<PracticaLinea[]>;
    getPracticaLineaById(id: number): Promise<PracticaLinea>;
    createPracticaLinea(createPracticaLineaDto: CreatePracticaLineaDto): Promise<PracticaLinea>;
    updatePracticaLinea(id: number, updatePracticaLineaDto: UpdatePracticaLineaDto): Promise<UpdateResult>;
    deletePracticaLinea(id: number): Promise<UpdateResult>;
}