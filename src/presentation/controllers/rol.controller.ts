import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { RolServiceImpl } from 'src/application/services/impl/rol.serviceImpl';
import { CreateRolDto, UpdateRolDto } from '../dto/rol.dto';
import { AuthGuard } from '../middlewares/auth.guard';

@Controller('rol')
export class RolController {

    constructor(
        private readonly rolService: RolServiceImpl
    ) {
    }

    @Get()
    @UseGuards(AuthGuard)
    getAllRol() {
        return this.rolService.getAllRol();
    }

    @Get(':id')
    getRolById(@Param('id') id: string) {
        return this.rolService.getRolById(+id);
    }

    @Post()
    create(@Body() createRolDto: CreateRolDto) {
        return this.rolService.createRol(createRolDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateRolDto: UpdateRolDto) {
        return this.rolService.updateRol(+id, updateRolDto);
    }

    @Patch('/delete/:id')
    delete(@Param('id') id: string) {
        return this.rolService.deleteRol(+id);
    }
    
}
