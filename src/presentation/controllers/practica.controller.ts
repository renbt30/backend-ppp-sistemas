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
    getPracticaById(@Param('id') id: number) {
        return this.practicaService.getPracticaById(+id);
    }

    @Get('/postulante/:id')
    getPracticasByPostulanteId(@Param('id') id: number) {
        return this.practicaService.getPracticasByPostulanteId(+id);
    }

    @Get('/detalle/:id')
    getDetallePracticaByPracticaId(@Param('id') id: number) {
        return this.practicaService.getDetallePracticaByPracticaId(+id);
    }

    @Get('/estado/:estado')
    getPracticasByEstado(@Param('estado') estado: string) {
        return this.practicaService.getPracticasByEstado(estado);
    }

    @Get('/metric')
    getMetricas() {
        console.log('Holaaaa');
        return this.practicaService.getMetricas();
    }

    @Post()
    create(@Body() createPracticaDto: CreatePracticaDto) {
        return this.practicaService.createPractica(createPracticaDto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updatePracticaDto: UpdatePracticaDto) {
        return this.practicaService.updatePractica(+id, updatePracticaDto);
    }
    
    @Patch('/delete/:id')
    delete(@Param('id') id: number) {
        return this.practicaService.deletePractica(+id);
    }

    @Patch('/update-estado')
    updateEstado(@Body('id') id: number, @Body('estado') estado: number) {
        return this.practicaService.updateEstadoPractica(id, estado);
    }
}