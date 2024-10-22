import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PracticaTipoDoc {
    @PrimaryGeneratedColumn()
    id_prctipodoc: number;

    @Column()
    nm_prctipodoc: string;

    @Column()
    estado: string;
}