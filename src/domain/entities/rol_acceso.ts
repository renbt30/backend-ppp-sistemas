import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class RolAcceso {
    @PrimaryColumn()
    id_rol: number;

    @PrimaryColumn()
    id_acceso: string;
}