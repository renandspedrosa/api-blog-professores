import { ITeacher } from '@/entities/models/teacher.interface'
import { ITeacherRepository } from '@/repositories/teacher.repository.interface'

export class FindTeacherByIdUseCase {
  constructor(private teacherRepository: ITeacherRepository) {}

  async handler(id: number): Promise<ITeacher | null> {
    const teacher = await this.teacherRepository.getById(id)

    if (!teacher) {
      return null
    }

    return teacher
  }
}
