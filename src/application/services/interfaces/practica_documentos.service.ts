import { PracticaDocumentos } from "src/domain/entities/practica_documentos";
import { CreatePracticaDocumentosDto, UpdatePracticaDocumentosDto } from "src/presentation/dto/practica_documentos.dto";
import { UpdateResult } from "typeorm";

export interface PracticaDocumentosService {
    getAllPracticaDocumentos(): Promise<PracticaDocumentos[]>;
    getPracticaDocumentosById(id: number): Promise<PracticaDocumentos>;
    createPracticaDocumentos(createPracticaDocumentosDto: CreatePracticaDocumentosDto, file: Express.Multer.File): Promise<PracticaDocumentos>;
    updatePracticaDocumentos(id: number, updatePracticaDocumentosDto: UpdatePracticaDocumentosDto): Promise<UpdateResult>;
    deletePracticaDocumentos(id: number): Promise<UpdateResult>;
    updateEstadoDocumento(id: number, estado: string): Promise<UpdateResult>;
    addObservacion(id: number, observacion: string): Promise<UpdateResult>;
}