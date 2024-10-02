import { IStudent } from '@/entities/models/student.interface'
import { IStudentRepository } from '@/repositories/student.repository.interface'

export class UpdateStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async handler(studentData: IStudent): Promise<IStudent> {
    return this.studentRepository.update(studentData)
  }
}
