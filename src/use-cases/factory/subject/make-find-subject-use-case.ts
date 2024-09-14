import { SubjectRepository } from '@/repositories/typeorm/subject.repository'
import { FindSubjectUseCase } from '@/use-cases/subject/find-subject'

export function makeFindSubjectUseCase() {
  const subjectRepository = new SubjectRepository()
  return new FindSubjectUseCase(subjectRepository)
}
