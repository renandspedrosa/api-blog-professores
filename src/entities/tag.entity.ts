import { Column, PrimaryGeneratedColumn, Entity, ManyToMany } from 'typeorm'
import { ITag } from './models/tags.interface'
import { Post } from './post.entity'

@Entity({
  name: 'tags',
})
export class Tag implements ITag {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
  })
  id?: number | undefined

  @Column({
    name: 'name',
    type: 'varchar',
  })
  name: string

  @Column({
    name: 'created_at',
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at?: Date

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[]
}
