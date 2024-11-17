import { ITeacher } from '@/entities/models/teacher.interface'
import { ITeacherRepository } from '@/repositories/teacher.repository.interface'

export class GetAllTeachersUseCase {
  constructor(private teacherRepository: ITeacherRepository) {}

  async handler(page: number, limit: number): Promise<ITeacher[]> {
    const teachers = await this.teacherRepository.getAllTeachers(page, limit)

    if (!teachers) {
      throw new Error('Professor não encontrado')
    }
    return teachers
  }
}
