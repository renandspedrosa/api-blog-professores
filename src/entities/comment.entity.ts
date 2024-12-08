import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Post } from './post.entity'
import { IComment } from './models/comment.interface'
import { User } from './user.entity'

@Entity({
  name: 'comments',
})
export class Comment implements IComment {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id?: string | undefined

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Post

  @Column({
    name: 'post_id',
    type: 'uuid',
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
  user_id: number

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User
}
