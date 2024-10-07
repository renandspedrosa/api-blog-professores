import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ISubject } from './models/subject.interface'
import { Teacher } from './teacher.entity'

@Entity({
  name: 'subjects',
})
export class Subject implements ISubject {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id?: string | undefined

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  name: string

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

  @ManyToMany(() => Teacher, (teacher) => teacher.subjects)
  teachers: Teacher[]
}
