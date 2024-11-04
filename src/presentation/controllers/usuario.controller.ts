import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsuarioServiceImpl } from 'src/application/services/impl/usuario.serviceImpl';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../dto/usuario.dto';

@Controller('usuario')
export class UsuarioController {

    constructor(
        private readonly tipoDocService: UsuarioServiceImpl
    ) {
    }

    @Get()
    getAllUsuario() {
        return this.tipoDocService.getAllUsuario();
    }

    @Get(':id')
    getUsuarioById(@Param('id') id: number) {
        return this.tipoDocService.getUsuarioById(+id);
    }

    @Post()
    create(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.tipoDocService.createUsuario(createUsuarioDto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
        return this.tipoDocService.updateUsuario(+id, updateUsuarioDto);
    }

    @Patch('/delete/:id')
    delete(@Param('id') id: number) {
        return this.tipoDocService.deleteUsuario(+id);
    }
    
}