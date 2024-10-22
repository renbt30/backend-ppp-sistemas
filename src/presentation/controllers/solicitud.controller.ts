import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SolicitudServiceImpl } from 'src/application/services/impl/solicitud.serviceImpl';
import { CreateSolicitudDto, UpdateSolicitudDto } from '../dto/solicitud.dto';

@Controller('solicitud')
export class SolicitudController {

    constructor(
        private readonly solicitudService: SolicitudServiceImpl
    ) {
    }

    @Get()
    getAllSolicitud() {
        return this.solicitudService.getAllSolicitud();
    }

    @Get(':id')
    getSolicitudById(@Param('id') id: string) {
        return this.solicitudService.getSolicitudById(+id);
    }

    @Post()
    create(@Body() createSolicitudDto: CreateSolicitudDto) {
        return this.solicitudService.createSolicitud(createSolicitudDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateSolicitudDto: UpdateSolicitudDto) {
        return this.solicitudService.updateSolicitud(+id, updateSolicitudDto);
    }

    @Patch('/delete/:id')
    delete(@Param('id') id: string) {
        return this.solicitudService.deleteSolicitud(+id);
    }
    
}