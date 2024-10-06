import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { User } from './user.entity'
import { ITeacher } from './models/teacher.interface'
import { Post } from './post.entity'

@Entity({
  name: 'teachers',
})
export class Teacher implements ITeacher {
  @PrimaryGeneratedColumn({
    type: 'integer',
  })
  id?: number

  @Column({
    name: 'user_id',
    type: 'int',
    nullable: true,
    default: null,
  })
  user_id?: number

  @Column({
    name: 'status',
    type: 'int',
    nullable: true,
    default: 1,
  })
  status?: number

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at?: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  updated_at?: Date | null

  @ManyToOne(() => User, (user) => user.teachers, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user?: User

  @OneToMany(() => Post, (post) => post.teacher_id)
  posts?: Post[]
}
