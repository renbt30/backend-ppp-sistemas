import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PracticaDocumentosServiceImpl } from 'src/application/services/impl/practica_documentos.serviceImpl';
import { CreatePracticaDocumentosDto, UpdatePracticaDocumentosDto } from '../dto/practica_documentos.dto';

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
    getPracticaDocumentosById(@Param('id') id: string) {
        return this.practicaDocumentosService.getPracticaDocumentosById(+id);
    }

    @Post()
    create(@Body() createPracticaDocumentosDto: CreatePracticaDocumentosDto) {
        return this.practicaDocumentosService.createPracticaDocumentos(createPracticaDocumentosDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePracticaDocumentosDto: UpdatePracticaDocumentosDto) {
        return this.practicaDocumentosService.updatePracticaDocumentos(+id, updatePracticaDocumentosDto);
    }
    
    @Patch('/delete/:id')
    delete(@Param('id') id: string) {
        return this.practicaDocumentosService.deletePracticaDocumentos(+id);
    }

}