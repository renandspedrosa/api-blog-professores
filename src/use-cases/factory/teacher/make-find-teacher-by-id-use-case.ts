import { TeacherRepository } from '@/repositories/typeorm/teacher.repository'
import { FindTeacherByIdUseCase } from '@/use-cases/teacher/find-teacher-by-id'

export function makeFindTeacherByIdUseCase() {
  const teacherRepository = new TeacherRepository()
  const findTeacherByIdUseCase = new FindTeacherByIdUseCase(teacherRepository)
  return findTeacherByIdUseCase
}
