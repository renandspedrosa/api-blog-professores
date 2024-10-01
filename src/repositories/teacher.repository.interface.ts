import { ITeacher } from '@/entities/models/teacher.interface'

export interface ITeacherRepository {
  create(teacher: ITeacher): Promise<ITeacher | undefined>
  getAllTeachers(page: number, limit: number): Promise<ITeacher[]>
  findByIdUser(id: number): Promise<ITeacher | null>
  update(teacher: ITeacher): Promise<ITeacher>
  delete(id: number): Promise<void>
}
