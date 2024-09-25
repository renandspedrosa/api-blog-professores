import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { IPost } from './models/post.interface'
import { ITag } from './models/tags.interface'
import { Tag } from './tag.entity'
import { Teacher } from './teacher.entity'

@Entity({
  name: 'posts',
})
export class Post implements IPost {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id?: string | undefined

  @Column({
    name: 'title',
    type: 'varchar',
    length: 10,
  })
  title: string

  @Column({
    name: 'content',
    type: 'text',
  })
  content: string

  @Column({
    name: 'status',
    type: 'int',
    default: 1,
    nullable: true,
  })
  status?: number

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  created_at?: Date

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  updated_at?: Date | null

  @ManyToMany(() => Tag, {
    cascade: true,
  })
  @JoinTable({
    name: 'posts_tags',
    joinColumn: {
      name: 'post_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags?: ITag[] | undefined

  @ManyToOne(() => Teacher, (teacher) => teacher.posts)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher

  @Column({ name: 'teacher_id', type: 'integer' })
  teacher_id: number
}
