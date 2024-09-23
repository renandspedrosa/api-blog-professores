import { makeUpdateTagUseCase } from '@/use-cases/factory/tag/make-update-tag'
import { Request, Response, NextFunction } from 'express'

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const { name } = req.body

    const updateTagUseCase = makeUpdateTagUseCase()
    const tag = await updateTagUseCase.handler({
      id: Number(id),
      name,
    })

    return res.status(201).json({ id: Number(tag.id), name: tag.name })
  } catch (error) {
    next(error)
  }
}
