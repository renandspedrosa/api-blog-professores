import { ISubject } from '@/entities/models/subject.interface'
import { ISubjectRepository } from '@/repositories/subject.repository.interface'

export class CreateSubjectUseCase {
  constructor(private subjectRepository: ISubjectRepository) {}

  async handler(subject: ISubject): Promise<ISubject> {
    return this.subjectRepository.create(subject)
  }
}
