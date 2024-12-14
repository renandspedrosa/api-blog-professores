import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { User } from './user.entity'
import { IPasswordResetToken } from './models/password-reset-tokens.interface'

@Entity({
  name: 'password_reset_tokens',
})
export class PasswordResetToken implements IPasswordResetToken {
  @PrimaryGeneratedColumn({
    type: 'integer',
  })
  id: number

  @Column({
    name: 'user_id',
    type: 'integer',
  })
  user_id: number

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: User

  @Column({
    name: 'token',
    type: 'text',
  })
  token: string

  @Column({
    name: 'expires_at',
    type: 'timestamp',
  })
  expires_at: Date

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date
}
