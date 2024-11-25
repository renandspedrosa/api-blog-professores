import { IStudent } from '@/entities/models/student.interface'
import { IStudentRepository } from '@/repositories/student.repository.interface'

export class FindStudentByIdUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async handler(id: number): Promise<IStudent | null> {
    const student = await this.studentRepository.getById(id)

    if (!student) {
      return null
    }

    return student
  }
}
