import { StudentRepository } from '@/repositories/typeorm/student.repository'
import { FindStudentByIdUseCase } from '@/use-cases/student/find-student-by-id'

export function makeFindStudentByIdUseCase() {
  const studentRepository = new StudentRepository()
  const findStudentByIdUseCase = new FindStudentByIdUseCase(studentRepository)
  return findStudentByIdUseCase
}
