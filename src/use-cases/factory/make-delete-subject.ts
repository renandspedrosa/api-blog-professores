import { SubjectRepository } from '@/repositories/typeorm/subject.repository'
import { DeleteSubjectUseCase } from '../subject/delete-subject'

export function makeDeleteSubjectUseCase() {
  const subjectRepository = new SubjectRepository()
  return new DeleteSubjectUseCase(subjectRepository)
}
