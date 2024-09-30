import { makeFindSubjectUseCase } from '@/use-cases/factory/subject/make-find-subject-use-case'
import { Request, Response } from 'express'
// import { NextFunction, Request, Response } from 'express'

export async function findSubject(
  req: Request,
  res: Response,
  // next: NextFunction,
) {
  try {
    const findSubjectUseCase = makeFindSubjectUseCase()
    const { id } = req.params
    const subject = await findSubjectUseCase.handler(id)

    return res.status(200).json(subject)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Subject not found') {
        return res.status(404).json({})
      } else {
        return res.status(500).json({ message: 'An unexpected error occurred' })
      }
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred' })
    }
  }
}
