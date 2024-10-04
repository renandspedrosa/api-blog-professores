import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm'
import { Post } from './post.entity'
import { IComment } from './models/comment.interface'

@Entity({
  name: 'comments',
})
export class Comment implements IComment {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
  })
  id?: string | undefined

  @Column({
    name: 'post_id',
    type: 'varchar',
  })
  post_id: string

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
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  updated_at?: Date | null

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at?: Date | undefined

  @Column({
    name: 'user_id',
    type: 'int',
  })
  user_id?: number | undefined

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post
}
