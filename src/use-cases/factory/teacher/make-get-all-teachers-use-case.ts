import { TeacherRepository } from '@/repositories/typeorm/teacher.repository'
import { GetAllTeachersUseCase } from '@/use-cases/teacher/get-all-teachers'

export function makeGetAllTeachersUseCase() {
  const teacherRepository = new TeacherRepository()
  const getAllTeachersUseCase = new GetAllTeachersUseCase(teacherRepository)
  return getAllTeachersUseCase
}
