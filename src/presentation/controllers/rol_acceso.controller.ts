import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RolAccesoServiceImpl } from 'src/application/services/impl/rol_acceso.serviceImpl';
import { CreateRolAccesoDto, UpdateRolAccesoDto } from '../dto/rol_acceso.dto';

@Controller('rol-acceso')
export class RolAccesoController {

    constructor(
        private readonly rolAccesoService: RolAccesoServiceImpl
    ) {
    }

    @Get()
    getAllRolAcceso() {
        return this.rolAccesoService.getAllRolAcceso();
    }

    @Get(':id')
    getRolAccesoByRolId(@Param('id') id: number) {
        return this.rolAccesoService.getRolAccesoByRolId(+id);
    }

    @Post()
    create(@Body() createRolAccesoDto: CreateRolAccesoDto) {
        return this.rolAccesoService.createRolAcceso(createRolAccesoDto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateRolAccesoDto: UpdateRolAccesoDto) {
        return this.rolAccesoService.updateRolAcceso(+id, updateRolAccesoDto);
    }

    @Patch('/delete/:id')
    delete(@Param('id') id: number) {
        return this.rolAccesoService.deleteRolAcceso(+id);
    }
    
}