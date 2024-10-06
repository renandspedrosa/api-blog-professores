import { Request, Response, NextFunction } from 'express'
import { makeGetCommentByIdUseCase } from '@/use-cases/factory/comment/get-comment-by-id-use-case'

export function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const getCommentById = makeGetCommentByIdUseCase()
    const comment = getCommentById.handler(id)

    return res.status(200).json(comment)
  } catch (error) {
    next(error)
  }
}
