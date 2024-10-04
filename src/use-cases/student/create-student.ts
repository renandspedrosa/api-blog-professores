import { Student } from '@/entities/student.entity'
import { IStudentRepository } from '@/repositories/student.repository.interface'

export class CreateStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  handler(student: Student) {
    return this.studentRepository.create(student)
  }
}
