import { TipoDoc } from "src/domain/entities/tipodoc";
import { CreateTipoDocDto, UpdateTipoDocDto } from "src/presentation/dto/tipodoc.dto";
import { UpdateResult } from "typeorm";

export interface TipoDocService {
    getAllTipoDoc(): Promise<TipoDoc[]>;
    getTipoDocById(id: number): Promise<TipoDoc>;
    createTipoDoc(createTipoDocDto: CreateTipoDocDto): Promise<TipoDoc>;
    updateTipoDoc(id: number, updateTipoDocDto: UpdateTipoDocDto): Promise<UpdateResult>;
    deleteTipoDoc(id: number): Promise<UpdateResult>;
}