import { ITeacher } from '@/entities/models/teacher.interface'
import { ITeacherRepository } from '@/repositories/teacher.repository.interface'

export class UpdateTeacherUseCase {
  constructor(private teacherRepository: ITeacherRepository) {}

  async handler(teacherData: ITeacher): Promise<ITeacher> {
    return this.teacherRepository.update(teacherData)
  }
}
