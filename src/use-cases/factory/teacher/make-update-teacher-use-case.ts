import { TeacherRepository } from '@/repositories/typeorm/teacher.repository'
import { UpdateTeacherUseCase } from '@/use-cases/teacher/update-teacher'

export function makeUpdateTeacherUseCase() {
  const teacherRepository = new TeacherRepository()
  const updateTeacherUseCase = new UpdateTeacherUseCase(teacherRepository)
  return updateTeacherUseCase
}
