import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PracticaLineaServiceImpl } from 'src/application/services/impl/practica_linea.serviceImpl';
import { CreatePracticaLineaDto, UpdatePracticaLineaDto } from '../dto/practica_linea.dto';

@Controller('practica-linea')
export class PracticaLineaController {

    constructor(
        private readonly practicaLineaService: PracticaLineaServiceImpl
    ) {
    }

    @Get()
    getAllPracticaLinea() {
        return this.practicaLineaService.getAllPracticaLinea();
    }

    @Get(':id')
    getPracticaLineaById(@Param('id') id: string) {
        return this.practicaLineaService.getPracticaLineaById(+id);
    }

    @Post()
    create(@Body() createPracticaLineaDto: CreatePracticaLineaDto) {
        return this.practicaLineaService.createPracticaLinea(createPracticaLineaDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePracticaLineaDto: UpdatePracticaLineaDto) {
        return this.practicaLineaService.updatePracticaLinea(+id, updatePracticaLineaDto);
    }
    
    @Patch('/delete/:id')
    delete(@Param('id') id: string) {
        return this.practicaLineaService.deletePracticaLinea(+id);
    }
    
}