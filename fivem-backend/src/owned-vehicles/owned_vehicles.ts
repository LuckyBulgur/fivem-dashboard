import { Column, Double, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Owned_vehicles {

    @PrimaryColumn()
    plate: string;

    @Column()
    owner: string;

    @Column()
    vehicle: string;

    @Column()
    type: string;

    @Column()
    job: string;

    @Column()
    stored: number;

    @Column()
    nickname: string;

    @Column()
    isFav: number;

    @Column()
    fuel: number;

    @Column()
    name: string;
}