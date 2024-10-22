import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TipoDoc {
    @PrimaryGeneratedColumn()
    id_tipodoc: number;

    @Column()
    nm_tipodoc: string;

    @Column()
    abreviatura: string;
}