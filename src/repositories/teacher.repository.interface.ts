import { ITeacher } from '@/entities/models/teacher.interface'

export interface ITeacherRepository {
  create(teacher: ITeacher): Promise<ITeacher | undefined>
  update(teacher: ITeacher): Promise<ITeacher>
}
