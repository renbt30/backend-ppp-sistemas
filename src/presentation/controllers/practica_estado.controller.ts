import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PracticaEstadoServiceImpl } from 'src/application/services/impl/practica_estado.serviceImpl';
import { CreatePracticaEstadoDto, UpdatePracticaEstadoDto } from '../dto/practica_estado.dto';

@Controller('practica-estado')
export class PracticaEstadoController {

    constructor(
        private readonly practicaEstadoService: PracticaEstadoServiceImpl
    ) {
    }

    @Get()
    getAllPracticaEstado() {
        return this.practicaEstadoService.getAllPracticaEstado();
    }

    @Get(':id')
    getPracticaEstadoById(@Param('id') id: string) {
        return this.practicaEstadoService.getPracticaEstadoById(+id);
    }

    @Post()
    create(@Body() createPracticaEstadoDto: CreatePracticaEstadoDto) {
        return this.practicaEstadoService.createPracticaEstado(createPracticaEstadoDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePracticaEstadoDto: UpdatePracticaEstadoDto) {
        return this.practicaEstadoService.updatePracticaEstado(+id, updatePracticaEstadoDto);
    }
    
    @Patch('/delete/:id')
    delete(@Param('id') id: string) {
        return this.practicaEstadoService.deletePracticaEstado(+id);
    }
    
}