import { PracticaHistorico } from "src/domain/entities/practica_historico";
import { CreatePracticaHistoricoDto, UpdatePracticaHistoricoDto } from "src/presentation/dto/practica_historico.dto";
import { UpdateResult } from "typeorm";

export interface PracticaHistoricoService {
    getAllPracticaHistorico(): Promise<PracticaHistorico[]>;
    getPracticaHistoricoByPracticaId(id: number): Promise<PracticaHistorico>;
    createPracticaHistorico(createPracticaHistoricoDto: CreatePracticaHistoricoDto): Promise<PracticaHistorico>;
    updatePracticaHistorico(id: number, updatePracticaHistoricoDto: UpdatePracticaHistoricoDto): Promise<UpdateResult>;
    deletePracticaHistorico(id: number): Promise<UpdateResult>;
}