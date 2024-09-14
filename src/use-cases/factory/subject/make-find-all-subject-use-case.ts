import { SubjectRepository } from '@/repositories/typeorm/subject.repository'
import { FindAllSubjectUseCase } from '../subject/find-all-subject'

export function makeFindAllSubjectUseCase() {
  const subjectRepository = new SubjectRepository()
  return new FindAllSubjectUseCase(subjectRepository)
}
