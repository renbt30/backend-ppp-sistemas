import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PracticaTipoDocServiceImpl } from 'src/application/services/impl/practica_tipodoc.serviceImpl';
import { CreatePracticaTipoDocDto, UpdatePracticaTipoDocDto } from '../dto/practica_tipodoc.dto';

@Controller('practica-tipodoc')
export class PracticaTipoDocController {

    constructor(
        private readonly practicaTipoDocService: PracticaTipoDocServiceImpl
    ) {
    }

    @Get()
    getAllPracticaTipoDoc() {
        return this.practicaTipoDocService.getAllPracticaTipoDoc();
    }

    @Get(':id')
    getPracticaTipoDocById(@Param('id') id: string) {
        return this.practicaTipoDocService.getPracticaTipoDocById(+id);
    }

    @Post()
    create(@Body() createPracticaTipoDocDto: CreatePracticaTipoDocDto) {
        return this.practicaTipoDocService.createPracticaTipoDoc(createPracticaTipoDocDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePracticaTipoDocDto: UpdatePracticaTipoDocDto) {
        return this.practicaTipoDocService.updatePracticaTipoDoc(+id, updatePracticaTipoDocDto);
    }
    
    @Patch('/delete/:id')
    delete(@Param('id') id: string) {
        return this.practicaTipoDocService.deletePracticaTipoDoc(+id);
    }
    
}