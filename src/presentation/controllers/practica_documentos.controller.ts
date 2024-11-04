import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PracticaDocumentosServiceImpl } from 'src/application/services/impl/practica_documentos.serviceImpl';
import { CreatePracticaDocumentosDto, UpdatePracticaDocumentosDto } from '../dto/practica_documentos.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('practica-documentos')
export class PracticaDocumentosController {

    constructor(
        private readonly practicaDocumentosService: PracticaDocumentosServiceImpl
    ) {
    }

    @Get()
    getAllPracticaDocumentos() {
        return this.practicaDocumentosService.getAllPracticaDocumentos();
    }

    @Get(':id')
    getPracticaDocumentosById(@Param('id') id: number) {
        return this.practicaDocumentosService.getPracticaDocumentosById(+id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@Body() createPracticaDocumentosDto: CreatePracticaDocumentosDto, @UploadedFile() file: Express.Multer.File) {
        return await this.practicaDocumentosService.createPracticaDocumentos(createPracticaDocumentosDto, file);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updatePracticaDocumentosDto: UpdatePracticaDocumentosDto) {
        return this.practicaDocumentosService.updatePracticaDocumentos(+id, updatePracticaDocumentosDto);
    }
    
    @Patch('/delete/:id')
    delete(@Param('id') id: number) {
        return this.practicaDocumentosService.deletePracticaDocumentos(+id);
    }

}