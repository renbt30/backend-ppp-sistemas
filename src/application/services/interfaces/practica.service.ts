import { Practica } from "src/domain/entities/practica";
import { CreatePracticaDto, UpdatePracticaDto } from "src/presentation/dto/practica.dto";
import { UpdateResult } from "typeorm";

export interface PracticaService {
    getAllPractica(): Promise<Practica[]>;
    getPracticaById(id: number): Promise<Practica>;
    //getPracticaByPostulantes(): Promise<Object[]>;
    getPracticasByPostulanteId(id: number): Promise<Object[]>;
    getDetallePracticaByPracticaId(id: number): Promise<Object>;
    getPracticasByEstado(estado: string): Promise<Object[]>;
    createPractica(createPracticaDto: CreatePracticaDto): Promise<Practica>;
    updatePractica(id: number, updatePracticaDto: UpdatePracticaDto): Promise<UpdateResult>;
    deletePractica(id: number): Promise<UpdateResult>;
    updateEstadoPractica(id: number, estado: number): Promise<UpdateResult>;
}