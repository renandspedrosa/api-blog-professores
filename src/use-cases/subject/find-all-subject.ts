import { ISubjectRepository } from '@/repositories/subject.repository.interface'

export class FindAllSubjectUseCase {
  constructor(private subjectRepository: ISubjectRepository) {}

  async handler(page: number, limit: number) {
    const subjects = await this.subjectRepository.findAll(page, limit)
    if (!subjects) {
      throw new Error('Subject not found')
    }
    return subjects
  }
}
