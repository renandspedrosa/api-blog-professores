import { StudentRepository } from '@/repositories/typeorm/student.repository'
import { UpdateStudentUseCase } from '@/use-cases/student/update-student'

export function makeUpdateStudentUseCase() {
  const studentRepository = new StudentRepository()
  const updateStudentUseCase = new UpdateStudentUseCase(studentRepository)
  return updateStudentUseCase
}
