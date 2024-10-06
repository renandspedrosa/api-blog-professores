import { IStudentRepository } from '@/repositories/student.repository.interface'

export class DeleteStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async handler(studentId: number): Promise<void> {
    await this.studentRepository.delete(studentId)
  }
}
