import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsuarioServiceImpl } from 'src/application/services/impl/usuario.serviceImpl';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../dto/usuario.dto';

@Controller('usuario')
export class UsuarioController {

    constructor(
        private readonly usuarioService: UsuarioServiceImpl
    ) {
    }

    @Get()
    getAllUsuario() {
        return this.usuarioService.getAllUsuario();
    }

    @Get('/rol/:id')
    getUsuariosByRolId(@Param('id') id: number) {
        return this.usuarioService.getUsuariosByRolId(+id);
    }

    @Get(':id')
    getUsuarioById(@Param('id') id: number) {
        return this.usuarioService.getUsuarioById(+id);
    }

    @Post()
    create(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.usuarioService.createUsuario(createUsuarioDto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
        return this.usuarioService.updateUsuario(+id, updateUsuarioDto);
    }

    @Patch('/delete/:id')
    delete(@Param('id') id: number) {
        return this.usuarioService.deleteUsuario(+id);
    }
    
}