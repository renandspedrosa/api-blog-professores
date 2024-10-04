import { StudentRepository } from '@/repositories/typeorm/student.repository'
import { DeleteStudentUseCase } from '@/use-cases/student/delete-student'

export function makeDeleteStudentUseCase() {
  const studentRepository = new StudentRepository()
  const deleteStudentUseCase = new DeleteStudentUseCase(studentRepository)

  return deleteStudentUseCase
}
