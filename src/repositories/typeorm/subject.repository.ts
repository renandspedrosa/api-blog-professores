import { ISubject } from '@/entities/models/subject.interface'
import { ISubjectRepository } from '../subject.repository.interface'
import { Repository } from 'typeorm'
import { Subject } from '@/entities/subject.entity'
import { appDataSource } from '@/lib/typeorm/typeorm'

export class SubjectRepository implements ISubjectRepository {
  private repository: Repository<Subject>

  constructor() {
    this.repository = appDataSource.getRepository(Subject)
  }

  async findAll(page: number, limit: number): Promise<ISubject[]> {
    return this.repository.find({
      where: { status: 1 },
      skip: (page - 1) * limit,
      take: limit,
    })
  }

  async findById(id: string): Promise<ISubject | null> {
    return this.repository.findOne({
      where: { id, status: 1 },
    })
  }

  async create(subject: ISubject): Promise<ISubject> {
    return this.repository.save(subject)
  }

  async update(subject: ISubject): Promise<ISubject> {
    const updatedSubject = {
      ...subject,
      updated_at: new Date(),
    }
    return this.repository.save(updatedSubject)
  }

  async delete(id: string): Promise<void> {
    await this.repository.update(id, { status: 0 })
  }
}
