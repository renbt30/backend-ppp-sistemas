import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Acceso {
    @PrimaryGeneratedColumn()
    id_acceso: number;

    @Column()
    nm_acceso: string;

    @Column()
    ruta: string;

    @Column()
    dt_creacion: Date;
}