import { Teacher } from '@/entities/teacher.entity'
import { ITeacherRepository } from '@/repositories/teacher.repository.interface'

export class CreateTeacherUseCase {
  constructor(private teacherRepository: ITeacherRepository) {}

  handler(teacher: Teacher) {
    return this.teacherRepository.create(teacher)
  }
}
