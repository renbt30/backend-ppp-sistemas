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
    getSolicitudById(@Param('id') id: number) {
        return this.solicitudService.getSolicitudById(+id);
    }

    @Get('/postulante/:id')
    getSolicitudesByPostulanteId(@Param('id') id: number) {
        return this.solicitudService.getSolicitudesByPostulanteId(+id);
    }

    @Get('/estado/:estado')
    getSolicitudesByEstado(@Param('estado') estado: string) {
        return this.solicitudService.getSolicitudesByEstado(estado);
    }

    @Get('/solicitud-estado/:estado_solicitud/practica-estado/:estado_practica')
    getSolicitudesBySolicitudEstadoAndPracticaEstado(@Param('estado_solicitud') estado_solicitud: string, @Param('estado_practica') estado_practica: string) {
        return this.solicitudService.getSolicitudesBySolicitudEstadoAndPracticaEstado(estado_solicitud, estado_practica);
    }

    @Post()
    create(@Body() createSolicitudDto: CreateSolicitudDto) {
        return this.solicitudService.createSolicitud(createSolicitudDto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateSolicitudDto: UpdateSolicitudDto) {
        return this.solicitudService.updateSolicitud(+id, updateSolicitudDto);
    }

    @Patch('/delete/:id')
    delete(@Param('id') id: number) {
        return this.solicitudService.deleteSolicitud(+id);
    }

    @Patch('/update-estado')
    updateEstado(@Body('id') id: number, @Body('estado') estado: string) {
        return this.solicitudService.updateEstadoSolicitud(id, estado);
    }

    @Patch('/add/observacion/:id')
    addObservacion(@Param('id') id: number, @Body('observacion') observacion: string) {
        return this.solicitudService.addObservacion(id, observacion);
    }
    
}