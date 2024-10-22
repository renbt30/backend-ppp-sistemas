import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { RolController } from './presentation/controllers/rol.controller';
import { ServiceModule } from './application/service.module';
import { AuthController } from './presentation/controllers/auth.controller';
import { UsuarioController } from './presentation/controllers/usuario.controller';
import { JwtService } from '@nestjs/jwt';
import { AccesoController } from './presentation/controllers/acceso.controller';
import { PracticaDocumentosController } from './presentation/controllers/practica_documentos.controller';
import { PracticaEstadoController } from './presentation/controllers/practica_estado.controller';
import { PracticaHistoricoController } from './presentation/controllers/practica_historico.controller';
import { PracticaLineaController } from './presentation/controllers/practica_linea.controller';
import { PracticaTipoDocController } from './presentation/controllers/practica_tipodoc.controller';
import { PracticaController } from './presentation/controllers/practica.controller';
import { RolAccesoController } from './presentation/controllers/rol_acceso.controller';
import { SolicitudContactoController } from './presentation/controllers/solicitud_contacto.controller';
import { SolicitudTipoContactoController } from './presentation/controllers/solicitud_tipocontacto.controller';
import { SolicitudController } from './presentation/controllers/solicitud.controller';
import { TipoDocController } from './presentation/controllers/tipodoc.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/config/${process.env.NODE_ENV.trim()}.env`,
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => databaseConfig(configService),
      inject: [ConfigService],
    }),
    ServiceModule
  ],
  controllers: [
    AccesoController,
    AuthController,
    PracticaDocumentosController,
    PracticaEstadoController,
    PracticaHistoricoController,
    PracticaLineaController,
    PracticaTipoDocController,
    PracticaController,
    RolAccesoController,
    RolController,
    SolicitudContactoController,
    SolicitudTipoContactoController,
    SolicitudController,
    TipoDocController,
    UsuarioController
  ],
  providers: [JwtService],
})
export class AppModule {}
