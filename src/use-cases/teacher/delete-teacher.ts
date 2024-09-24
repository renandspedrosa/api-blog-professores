import { ITeacherRepository } from '@/repositories/teacher.repository.interface'

export class DeleteTeacherUseCase {
  constructor(private teacherRepository: ITeacherRepository) {}

  async handler(teacherId: number): Promise<void> {
    await this.teacherRepository.delete(teacherId)
  }
}
