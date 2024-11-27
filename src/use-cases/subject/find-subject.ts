import { ISubjectRepository } from '@/repositories/subject.repository.interface'

export class FindSubjectUseCase {
  constructor(private subjectRepository: ISubjectRepository) {}

  async handler(id: string) {
    const subject = await this.subjectRepository.findById(id)
    if (!subject) {
      throw new Error('Matéria não encontrado')
    }
    return subject
  }
}
