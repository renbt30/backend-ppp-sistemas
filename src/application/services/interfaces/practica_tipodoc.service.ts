import { PracticaTipoDoc } from "src/domain/entities/practica_tipodoc";
import { CreatePracticaTipoDocDto, UpdatePracticaTipoDocDto } from "src/presentation/dto/practica_tipodoc.dto";
import { UpdateResult } from "typeorm";

export interface PracticaTipoDocService {
    getAllPracticaTipoDoc(): Promise<PracticaTipoDoc[]>;
    getPracticaTipoDocById(id: number): Promise<PracticaTipoDoc>;
    createPracticaTipoDoc(createPracticaTipoDocDto: CreatePracticaTipoDocDto): Promise<PracticaTipoDoc>;
    updatePracticaTipoDoc(id: number, updatePracticaTipoDocDto: UpdatePracticaTipoDocDto): Promise<UpdateResult>;
    deletePracticaTipoDoc(id: number): Promise<UpdateResult>;
}