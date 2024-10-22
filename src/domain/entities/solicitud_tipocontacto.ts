import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SolicitudTipoContacto {
    @PrimaryGeneratedColumn()
    id_tipocontacto: number;

    @Column()
    nm_tipocontacto: string;

    @Column()
    estado: string;
}