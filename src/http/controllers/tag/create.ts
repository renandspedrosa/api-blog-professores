import { makeCreateTagUseCase } from '@/use-cases/factory/tag/make-create-tag'
import { Request, Response, NextFunction } from 'express'

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.body

    const createTagUseCase = makeCreateTagUseCase()
    const tag = await createTagUseCase.handler({ name })

    return res.status(201).json(tag)
  } catch (error) {
    next(error)
  }
}
