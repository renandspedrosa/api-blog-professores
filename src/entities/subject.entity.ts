import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ISubject } from "./models/subject.interface";
// import { ITag } from "./models/tags.interface";
// import { Tag } from "./tag.entity";


@Entity({
    name: 'subjects'
})
export class Subject implements ISubject {
    @PrimaryGeneratedColumn('uuid', {
        name: 'id'
    })
    id?: string | undefined;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 255
    })
    name: string;

    @Column({
        name: 'status',
        type: 'int',
        default: 1, 
        nullable: true
    })
    status?: number;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true
    })
    created_at?: Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true
    })
    updated_at?: Date | null;

    // @ManyToMany(() => Tag, {
    //     cascade: true
    // })
    // @JoinTable({
    //     name: 'subject_tags',
    //     joinColumn: {
    //         name: 'subject_id',
    //         referencedColumnName: 'id'
    //     },
    //     inverseJoinColumn: {
    //         name: 'tag_id',
    //         referencedColumnName: 'id'
    //     }
    // })
    // tags?: ITag[] | undefined;
}
