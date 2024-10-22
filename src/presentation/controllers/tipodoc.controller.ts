import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TipoDocServiceImpl } from 'src/application/services/impl/tipodoc.serviceImpl';
import { CreateTipoDocDto, UpdateTipoDocDto } from '../dto/tipodoc.dto';

@Controller('tipodoc')
export class TipoDocController {

    constructor(
        private readonly tipoDocService: TipoDocServiceImpl
    ) {
    }

    @Get()
    getAllTipoDoc() {
        return this.tipoDocService.getAllTipoDoc();
    }

    @Get(':id')
    getTipoDocById(@Param('id') id: string) {
        return this.tipoDocService.getTipoDocById(+id);
    }

    @Post()
    create(@Body() createTipoDocDto: CreateTipoDocDto) {
        return this.tipoDocService.createTipoDoc(createTipoDocDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTipoDocDto: UpdateTipoDocDto) {
        return this.tipoDocService.updateTipoDoc(+id, updateTipoDocDto);
    }

    @Patch('/delete/:id')
    delete(@Param('id') id: string) {
        return this.tipoDocService.deleteTipoDoc(+id);
    }
    
}