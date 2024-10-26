import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../interfaces/auth.service';
import { Usuario } from 'src/domain/entities/usuario';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

class Tokens {
    access_token: string;
    refresh_token: string;
    message?: string; // Opcional
}

@Injectable()
export class AuthServiceImpl implements AuthService {

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
    
    }

    async login(usuario: string, clave: string): Promise<Tokens> {
        const user = await this.usuarioRepository.findOne({
            where: [{
                usuario: usuario
            }]
        });

        if (!user) {
            throw new UnauthorizedException('Datos incorrectos');
        }

        const isPasswordValid = await bcrypt.compare(clave, user.clave);

        const payload = { 
            sub: user.id_usuario,
            username: user.usuario,
            email: user.correo,
            idrol: user.id_rol
        };

        if (isPasswordValid) {
            const { access_token, refresh_token } = await this.generateToken(payload);

            return { 
                access_token,
                refresh_token,
                message: 'Login exitoso'
            };
        } else {
            throw new UnauthorizedException('Datos incorrectos');
        }
    }

    async refresh(refresh_old_token:string): Promise<Tokens> {
        try {
            const user = await this.jwtService.verifyAsync(refresh_old_token, { secret: this.configService.get<string>('JWT_SECRET_REFRESH') });

            // Refactorizar el payload con los valores de user
            const payload = {
                sub: user.sub,
                username: user.username,
                email: user.email,
                idrol: user.idrol
            };

            // Nuevos access_token y refresh_token
            const { access_token, refresh_token } = await this.generateToken(payload);

            return {
                access_token: access_token,
                refresh_token: refresh_token,
                message: 'Refresh token correcto'
            }

        } catch (error) {
            throw new UnauthorizedException('El refresh token falló');
        }
    }

    private async generateToken(payload: object): Promise<Tokens> {

        const [access_token, refresh_token] = await Promise.all([
            // Para access_token
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_SECRET'),
                expiresIn: '25m'
            }),

            // Para refresh_token
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_SECRET_REFRESH'),
                expiresIn: '1d'
            })
        ]);

        return {
            access_token: access_token,
            refresh_token: refresh_token
        }
    }
}