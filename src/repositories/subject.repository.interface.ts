import { ISubject } from '@/entities/models/subject.interface'

export interface ISubjectRepository {
  findAll(page: number, limit: number): Promise<ISubject[]>
  findById(id: string): Promise<ISubject | null>
  create(subject: ISubject): Promise<ISubject>
  update(subject: ISubject): Promise<ISubject>
  delete(id: string): Promise<void>
}
