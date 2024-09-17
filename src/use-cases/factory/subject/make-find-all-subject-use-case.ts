import { SubjectRepository } from '@/repositories/typeorm/subject.repository'
import { FindAllSubjectUseCase } from '@/use-cases/subject/find-all-subject'

export function makeFindAllSubjectUseCase() {
  const subjectRepository = new SubjectRepository()
  return new FindAllSubjectUseCase(subjectRepository)
}
