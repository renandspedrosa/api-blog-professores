import { Repository } from 'typeorm'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { Student } from '@/entities/student.entity'
import { IStudentRepository } from '@/repositories/student.repository.interface'
import { IStudent } from '@/entities/models/student.interface'

export class StudentRepository implements IStudentRepository {
  private repository: Repository<Student>

  constructor() {
    this.repository = appDataSource.getRepository(Student)
  }

  async create(studentData: IStudent): Promise<IStudent> {
    const student = this.repository.create(studentData)
    return this.repository.save(student)
  }

  async getAllStudents(page: number, limit: number): Promise<IStudent[]> {
    return this.repository.find({
      where: { status: 1 },
      skip: (page - 1) * limit,
      take: limit,
    })
  }

  async delete(studentId: number): Promise<void> {
    await this.repository.update(studentId, { status: 0 })
  }
}
