import { StudentRepository } from '@/repositories/typeorm/student.repository'
import { GetAllStudentsUseCase } from '@/use-cases/studednt/get-all-students'

export function makeGetAllStudentsUseCase() {
  const studentRepository = new StudentRepository()
  const getAllStudentsUseCase = new GetAllStudentsUseCase(studentRepository)
  return getAllStudentsUseCase
}
