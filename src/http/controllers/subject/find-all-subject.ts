import { makeFindAllSubjectUseCase } from '@/use-cases/factory/subject/make-find-all-subject-use-case'
import { Request, Response, NextFunction } from 'express'

export async function findAllSubject(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { page, limit } = req.body

    const findAllSubjectUseCase = makeFindAllSubjectUseCase()

    const subjects = await findAllSubjectUseCase.handler(page, limit)

    return res.status(200).json(subjects)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Matéria não encontrada') {
        return res.status(404).json([])
      }
    }
    next(error)
  }
}
