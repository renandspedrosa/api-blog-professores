import { makeDeleteSubjectUseCase } from '@/use-cases/factory/subject/make-delete-subject'
import { Request, Response } from 'express'

export async function deleteSubject(req: Request, res: Response) {
  const { id } = req.params

  const deleteSubjectUseCase = makeDeleteSubjectUseCase()

  await deleteSubjectUseCase.handler(id)

  return res.status(204).send()
}
