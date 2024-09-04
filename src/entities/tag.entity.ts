import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { ITag } from "./models/tags.interface";


@Entity({
    name: 'tags'
})
export class Tag implements ITag {
    @PrimaryGeneratedColumn('increment',{
        name: 'id'
    })
    id?: number | undefined;

    @Column({
        name: 'name',
        type: 'varchar'
    })
    name: string;

    @Column({
        name: 'created_at',
        type: 'timestamp without time zone',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at?: Date;
}