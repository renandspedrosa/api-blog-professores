import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Teacher } from './teacher.entity'
import { Student } from './student.entity'
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn({
    type: 'integer',
  })
  id?: number

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
  })
  email: string

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
  })
  password: string

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
  })
  name: string

  @OneToMany(() => Teacher, (teacher) => teacher.user)
  teachers?: Teacher[]

  @OneToMany(() => Student, (student) => student.user)
  students?: Student[]
}
