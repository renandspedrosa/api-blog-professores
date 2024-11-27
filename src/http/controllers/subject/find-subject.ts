import { makeFindSubjectUseCase } from '@/use-cases/factory/subject/make-find-subject-use-case'
import { Request, Response, NextFunction } from 'express'

export async function findSubject(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const findSubjectUseCase = makeFindSubjectUseCase()
    const { id } = req.params
    const subject = await findSubjectUseCase.handler(id)

    return res.status(200).json(subject)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Matéria não encontrado') {
        return res.status(404).json({})
      }
    }
    next(error)
  }
}
