import { makeDeleteTagUseCase } from '@/use-cases/factory/tag/make-delete-tag'
import { Request, Response, NextFunction } from 'express'

export async function deleteTag(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params

    const deleteTagUseCase = makeDeleteTagUseCase()

    await deleteTagUseCase.handler(id)

    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}
