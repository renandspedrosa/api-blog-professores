import { ISubjectRepository } from '@/repositories/subject.repository.interface'

export class DeleteSubjectUseCase {
  constructor(private subjectRepository: ISubjectRepository) {}

  async handler(id: string): Promise<void> {
    // const subject = await this.subjectRepository.findById(id);
    // if (!subject) { throw new Error('Subject not found'); }
    return this.subjectRepository.delete(id)
  }
}
