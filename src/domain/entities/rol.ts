import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    id_rol: number;

    @Column()
    nm_rol: string;

    @Column()
    tipo_rol: string;

    @Column()
    estado: string;

    @Column()
    dt_creacion: Date;
}