import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AccesoServiceImpl } from 'src/application/services/impl/acceso.serviceImpl';
import { CreateAccesoDto, UpdateAccesoDto } from '../dto/acceso.dto';

@Controller('acceso')
export class AccesoController {

    constructor(
        private readonly accesoService: AccesoServiceImpl
    ) {
    }

    @Get()
    getAllAcceso() {
        return this.accesoService.getAllAcceso();
    }

    @Get(':id')
    getAccesoById(@Param('id') id: number) {
        return this.accesoService.getAccesoById(+id);
    }

    @Post()
    create(@Body() createAccesoDto: CreateAccesoDto) {
        return this.accesoService.createAcceso(createAccesoDto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateAccesoDto: UpdateAccesoDto) {
        return this.accesoService.updateAcceso(+id, updateAccesoDto);
    }
    
    @Patch('/delete/:id')
    delete(@Param('id') id: number) {
        return this.accesoService.deleteAcceso(+id);
    }
    
}