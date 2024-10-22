import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SolicitudContactoServiceImpl } from 'src/application/services/impl/solicitud_contacto.serviceImpl';
import { CreateSolicitudContactoDto, UpdateSolicitudContactoDto } from '../dto/solicitud_contacto.dto';

@Controller('solicitud-contacto')
export class SolicitudContactoController {

    constructor(
        private readonly solicitudContactoService: SolicitudContactoServiceImpl
    ) {
    }

    @Get()
    getAllSolicitudContacto() {
        return this.solicitudContactoService.getAllSolicitudContacto();
    }

    @Get(':id')
    getSolicitudContactoById(@Param('id') id: string) {
        return this.solicitudContactoService.getSolicitudContactoById(+id);
    }

    @Post()
    create(@Body() createSolicitudContactoDto: CreateSolicitudContactoDto) {
        return this.solicitudContactoService.createSolicitudContacto(createSolicitudContactoDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateSolicitudContactoDto: UpdateSolicitudContactoDto) {
        return this.solicitudContactoService.updateSolicitudContacto(+id, updateSolicitudContactoDto);
    }

    @Patch('/delete/:id')
    delete(@Param('id') id: string) {
        return this.solicitudContactoService.deleteSolicitudContacto(+id);
    }
    
}