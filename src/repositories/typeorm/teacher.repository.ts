import { Repository } from 'typeorm'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { Teacher } from '@/entities/teacher.entity'
import { ITeacherRepository } from '@/repositories/teacher.repository.interface'
import { ITeacher } from '@/entities/models/teacher.interface'

export class TeacherRepository implements ITeacherRepository {
  private repository: Repository<Teacher>

  constructor() {
    this.repository = appDataSource.getRepository(Teacher)
  }

  async create(teacherData: ITeacher): Promise<ITeacher> {
    const teacher = this.repository.create(teacherData)
    return this.repository.save(teacher)
  }

  async getAllTeachers(page: number, limit: number): Promise<ITeacher[]> {
    const teachers = await this.repository.find({
      relations: ['subjects', 'user'],
      where: { status: 1 },
      skip: (page - 1) * limit,
      take: limit,
    })

    return teachers.map((teacher) => ({
      id: teacher.id,
      user_id: teacher.user_id,
      email: teacher.user?.email || null,
      name: teacher.user?.name || null,
      subjects:
        teacher.subjects?.map((subject) => ({
          id: subject.id,
          name: subject.name,
        })) || [],
    }))
  }

  async getById(teacherId: number): Promise<ITeacher | null> {
    return this.repository.findOne({ where: { id: teacherId, status: 1 } })
  }

  async delete(teacherId: number): Promise<void> {
    await this.repository.update(teacherId, { status: 0 })
  }
}
