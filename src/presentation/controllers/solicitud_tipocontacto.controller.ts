import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SolicitudTipoContactoServiceImpl } from 'src/application/services/impl/solicitud_tipocontacto.serviceImpl';
import { CreateSolicitudTipoContactoDto, UpdateSolicitudTipoContactoDto } from '../dto/solicitud_tipocontacto.dto';

@Controller('solicitud-tipocontacto')
export class SolicitudTipoContactoController {

    constructor(
        private readonly solicitudTipoContactoService: SolicitudTipoContactoServiceImpl
    ) {
    }

    @Get()
    getAllSolicitudTipoContacto() {
        return this.solicitudTipoContactoService.getAllSolicitudTipoContacto();
    }

    @Get(':id')
    getSolicitudTipoContactoById(@Param('id') id: string) {
        return this.solicitudTipoContactoService.getSolicitudTipoContactoById(+id);
    }

    @Post()
    create(@Body() createSolicitudTipoContactoDto: CreateSolicitudTipoContactoDto) {
        return this.solicitudTipoContactoService.createSolicitudTipoContacto(createSolicitudTipoContactoDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateSolicitudTipoContactoDto: UpdateSolicitudTipoContactoDto) {
        return this.solicitudTipoContactoService.updateSolicitudTipoContacto(+id, updateSolicitudTipoContactoDto);
    }

    @Patch('/delete/:id')
    delete(@Param('id') id: string) {
        return this.solicitudTipoContactoService.deleteSolicitudTipoContacto(+id);
    }
    
}