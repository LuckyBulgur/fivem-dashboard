import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Users {

    @PrimaryColumn()
    identifier: string;

    @Column()
    license: string;

    @Column()
    money: number;

    @Column()
    name: string;

    @Column()
    skin: string;

    @Column()
    job: string;

    @Column()
    job_grade: number;

    @Column()
    loadout: string;

    @Column()
    position: string;

    @Column()
    bank: number;

    @Column()
    permission_level: number;

    @Column()
    group: string;

    @Column()
    is_dead: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    dateofbirth: string;

    @Column()
    sex: string;

    @Column()
    height: string;

    @Column()
    phone_number: number;

    @Column()
    last_property: string;

    @Column()
    status: string;

    @Column()
    hotbar: string;
}