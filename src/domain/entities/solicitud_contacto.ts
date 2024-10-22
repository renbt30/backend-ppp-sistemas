import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SolicitudContacto {
    @PrimaryGeneratedColumn()
    id_solcontacto: number;

    @Column()
    id_solicitud: number;

    @Column()
    id_tipocontacto: number;

    @Column()
    nombre: string;

    @Column()
    celular: string;

    @Column()
    correo: string;
}