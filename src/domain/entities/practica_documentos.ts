import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PracticaDocumentos {
    @PrimaryGeneratedColumn()
    id_prcdocumento: number;

    @Column()
    id_practica: number;

    @Column()
    id_prctipodoc: number;

    @Column()
    file_name: string;

    @Column()
    file_link: string;

    @Column()
    dt_reg: Date;

    @Column()
    estado: string;

    @Column()
    observacion: string;

    @Column()
    id_usuariorev: number;
}