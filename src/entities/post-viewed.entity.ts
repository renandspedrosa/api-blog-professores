import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IPostViewed } from './models/post-viewed.interface'

@Entity({
  name: 'post_viewed',
})
export class PostViewed implements IPostViewed {
  @PrimaryGeneratedColumn({
    type: 'integer',
  })
  id?: number

  @Column({
    name: 'student_id',
    type: 'integer',
  })
  student_id: number

  @Column({
    name: 'post_id',
    type: 'uuid',
  })
  post_id: string

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  created_at?: Date
}
