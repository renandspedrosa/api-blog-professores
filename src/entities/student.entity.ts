import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { User } from './user.entity'
import { IStudent } from './models/student.interface'

@Entity({
  name: 'students',
})
export class Student implements IStudent {
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

  @ManyToOne(() => User, (user) => user.students, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user?: User
}
