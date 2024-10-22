import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PracticaServiceImpl } from 'src/application/services/impl/practica.serviceImpl';
import { CreatePracticaDto, UpdatePracticaDto } from '../dto/practica.dto';

@Controller('practica')
export class PracticaController {

    constructor(
        private readonly practicaService: PracticaServiceImpl
    ) {
    }

    @Get()
    getAllPractica() {
        return this.practicaService.getAllPractica();
    }

    @Get(':id')
    getPracticaById(@Param('id') id: string) {
        return this.practicaService.getPracticaById(+id);
    }

    @Post()
    create(@Body() createPracticaDto: CreatePracticaDto) {
        return this.practicaService.createPractica(createPracticaDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePracticaDto: UpdatePracticaDto) {
        return this.practicaService.updatePractica(+id, updatePracticaDto);
    }
    
    @Patch('/delete/:id')
    delete(@Param('id') id: string) {
        return this.practicaService.deletePractica(+id);
    }
    
}