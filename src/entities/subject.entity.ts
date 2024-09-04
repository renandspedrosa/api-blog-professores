import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ISubject } from "./models/subject.interface";
import { ITag } from "./models/tags.interface";
import { Tag } from "./tag.entity";


@Entity({
    name: 'subjects'
})
export class Subject implements ISubject {
    @PrimaryGeneratedColumn('uuid',{
        name: 'id'
    })
    id?: string | undefined;
    
    @Column({
        name: 'name',
        type: 'varchar'
    })
    name: string;

    @Column({
        name: 'description',
        type: 'text'
    })
    description: string;

    @Column({
        name: 'image_url',
        type: 'varchar'
    })
    image_url: string;

    @ManyToMany(() => Tag, {
        cascade: true
    })
    @JoinTable({
        name: 'subject_tags',
        joinColumn: {
            name: 'subject_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'tag_id',
            referencedColumnName: 'id'
        }
    })
    tags?: ITag[] | undefined;
}
