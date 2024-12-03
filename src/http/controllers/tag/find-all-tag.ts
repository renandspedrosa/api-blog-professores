import { makeFindAllTagUseCase } from '@/use-cases/factory/tag/make-find-all-tag-use-case'
import { Request, Response, NextFunction } from 'express'

export async function findAllTag(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { page, limit } = req.body

    const findAllTagUseCase = makeFindAllTagUseCase()

    const tags = await findAllTagUseCase.handler(page, limit)

    return res.status(200).json(tags)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Categoria não encontrada') {
        return res.status(404).json([])
      }
    }
    next(error)
  }
}
