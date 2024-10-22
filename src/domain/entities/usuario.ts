import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column()
    id_rol: number;

    @Column()
    id_tipodoc: number;

    @Column()
    num_doc: string;

    @Column()
    nombre: string;

    @Column()
    correo: string;

    @Column()
    usuario: string;

    @Column()
    clave: string;

    @Column()
    estado: string;

    @Column()
    dt_creacion: Date;
}