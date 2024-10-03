import { makeDeleteSubjectUseCase } from '@/use-cases/factory/subject/make-delete-subject'
import { Request, Response, NextFunction } from 'express'

export async function deleteSubject(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params

    const deleteSubjectUseCase = makeDeleteSubjectUseCase()

    await deleteSubjectUseCase.handler(id)

    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}
