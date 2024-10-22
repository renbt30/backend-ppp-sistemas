import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AuthServiceImpl } from 'src/application/services/impl/auth.serviceImpl';

@Controller('auth')
export class AuthController {
    
    constructor(
        private readonly authService: AuthServiceImpl
    ) {
    }

    @Post('login')
    login(@Body() dataLogin: { usuario: string, clave: string }) {
        return this.authService.login(dataLogin.usuario, dataLogin.clave);
    }

    @Post('refresh')
    refresh(@Body('refresh_token') refresh_token: string) {
        return this.authService.refresh(refresh_token);
    }
    
}
