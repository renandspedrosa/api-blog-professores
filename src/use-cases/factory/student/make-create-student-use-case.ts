import { StudentRepository } from '@/repositories/typeorm/student.repository'
import { CreateStudentUseCase } from '@/use-cases/student/create-student'

export function makeCreateStudentUseCase() {
  const studentRepository = new StudentRepository()
  const createStudentUseCase = new CreateStudentUseCase(studentRepository)
  return createStudentUseCase
}
