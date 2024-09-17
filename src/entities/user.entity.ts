import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Teacher } from './teacher.entity'
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn({
    type: 'integer',
  })
  id?: number

  @Column({
    name: 'username',
    type: 'varchar',
    length: 255,
  })
  username: string

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
  })
  password: string

  @OneToMany(() => Teacher, (teacher) => teacher.user)
  teachers?: Teacher[]
}
