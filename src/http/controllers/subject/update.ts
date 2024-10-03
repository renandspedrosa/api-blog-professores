import { makeUpdateSubjectUseCase } from '@/use-cases/factory/subject/make-update-subject'
import { Request, Response, NextFunction } from 'express'

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const { name } = req.body

    const updateSubjectUseCase = makeUpdateSubjectUseCase()

    const subject = await updateSubjectUseCase.handler({
      id,
      name,
    })

    return res.status(200).json({ id: subject.id, name: subject.name })
  } catch (error) {
    next(error)
  }
}
