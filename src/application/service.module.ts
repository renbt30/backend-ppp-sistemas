import { Module } from '@nestjs/common';
import { RolServiceImpl } from './services/impl/rol.serviceImpl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/domain/entities/rol';
import { AuthServiceImpl } from './services/impl/auth.serviceImpl';
import { UsuarioServiceImpl } from './services/impl/usuario.serviceImpl';
import { Usuario } from 'src/domain/entities/usuario';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccesoServiceImpl } from './services/impl/acceso.serviceImpl';
import { PracticaDocumentosServiceImpl } from './services/impl/practica_documentos.serviceImpl';
import { PracticaEstadoServiceImpl } from './services/impl/practica_estado.serviceImpl';
import { PracticaHistoricoServiceImpl } from './services/impl/practica_historico.serviceImpl';
import { PracticaLineaServiceImpl } from './services/impl/practica_linea.serviceImpl';
import { PracticaTipoDocServiceImpl } from './services/impl/practica_tipodoc.serviceImpl';
import { PracticaServiceImpl } from './services/impl/practica.serviceImpl';
import { RolAccesoServiceImpl } from './services/impl/rol_acceso.serviceImpl';
import { SolicitudContactoServiceImpl } from './services/impl/solicitud_contacto.serviceImpl';
import { SolicitudTipoContactoServiceImpl } from './services/impl/solicitud_tipocontacto.serviceImpl';
import { SolicitudServiceImpl } from './services/impl/solicitud.serviceImpl';
import { TipoDocServiceImpl } from './services/impl/tipodoc.serviceImpl';
import { Acceso } from 'src/domain/entities/acceso';
import { PracticaDocumentos } from 'src/domain/entities/practica_documentos';
import { PracticaEstado } from 'src/domain/entities/practica_estado';
import { PracticaHistorico } from 'src/domain/entities/practica_historico';
import { PracticaLinea } from 'src/domain/entities/practica_linea';
import { PracticaTipoDoc } from 'src/domain/entities/practica_tipodoc';
import { Practica } from 'src/domain/entities/practica';
import { RolAcceso } from 'src/domain/entities/rol_acceso';
import { SolicitudContacto } from 'src/domain/entities/solicitud_contacto';
import { SolicitudTipoContacto } from 'src/domain/entities/solicitud_tipocontacto';
import { Solicitud } from 'src/domain/entities/solicitud';
import { TipoDoc } from 'src/domain/entities/tipodoc';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Acceso,
      PracticaDocumentos,
      PracticaEstado,
      PracticaHistorico,
      PracticaLinea,
      PracticaTipoDoc,
      Practica,
      RolAcceso,
      Rol,
      SolicitudContacto,
      SolicitudTipoContacto,
      Solicitud,
      TipoDoc,
      Usuario
    ])
  ],
  providers: [
    AccesoServiceImpl,
    AuthServiceImpl,
    PracticaDocumentosServiceImpl,
    PracticaEstadoServiceImpl,
    PracticaHistoricoServiceImpl,
    PracticaLineaServiceImpl,
    PracticaTipoDocServiceImpl,
    PracticaServiceImpl,
    RolAccesoServiceImpl,
    RolServiceImpl,
    SolicitudContactoServiceImpl,
    SolicitudTipoContactoServiceImpl,
    SolicitudServiceImpl,
    TipoDocServiceImpl,
    UsuarioServiceImpl,
    JwtService
  ],
  exports: [
    AccesoServiceImpl,
    AuthServiceImpl,
    PracticaDocumentosServiceImpl,
    PracticaEstadoServiceImpl,
    PracticaHistoricoServiceImpl,
    PracticaLineaServiceImpl,
    PracticaTipoDocServiceImpl,
    PracticaServiceImpl,
    RolAccesoServiceImpl,
    RolServiceImpl,
    SolicitudContactoServiceImpl,
    SolicitudTipoContactoServiceImpl,
    SolicitudServiceImpl,
    TipoDocServiceImpl,
    UsuarioServiceImpl,
  ],
})
export class ServiceModule {}