import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PracticaHistoricoServiceImpl } from 'src/application/services/impl/practica_historico.serviceImpl';
import { CreatePracticaHistoricoDto, UpdatePracticaHistoricoDto } from '../dto/practica_historico.dto';

@Controller('practica-historico')
export class PracticaHistoricoController {

    constructor(
        private readonly practicaHistoricoService: PracticaHistoricoServiceImpl
    ) {
    }

    @Get()
    getAllPracticaHistorico() {
        return this.practicaHistoricoService.getAllPracticaHistorico();
    }

    @Get(':id')
    getPracticaHistoricoByPracticaId(@Param('id') id: string) {
        return this.practicaHistoricoService.getPracticaHistoricoByPracticaId(+id);
    }

    @Post()
    create(@Body() createPracticaHistoricoDto: CreatePracticaHistoricoDto) {
        return this.practicaHistoricoService.createPracticaHistorico(createPracticaHistoricoDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePracticaHistoricoDto: UpdatePracticaHistoricoDto) {
        return this.practicaHistoricoService.updatePracticaHistorico(+id, updatePracticaHistoricoDto);
    }
    
    @Patch('/delete/:id')
    delete(@Param('id') id: string) {
        return this.practicaHistoricoService.deletePracticaHistorico(+id);
    }
    
}