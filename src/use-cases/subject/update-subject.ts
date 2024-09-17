import { ISubject } from '@/entities/models/subject.interface'
import { ISubjectRepository } from '@/repositories/subject.repository.interface'

export class UpdateSubjectUseCase {
  constructor(private subjectRepository: ISubjectRepository) {}

  async handler(subject: ISubject) {
    // const subjectExists = await this.subjectRepository.findById(subject.id);
    // if (!subjectExists) { throw new Error('Subject not found'); }
    return this.subjectRepository.update(subject)
  }
}
