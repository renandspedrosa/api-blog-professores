import { Request, Response, NextFunction } from 'express'
import { makeGetAllCommentsUseCase } from '@/use-cases/factory/comment/get-all-comments-use-case'

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = req.body

    const createCommentUseCase = makeGetAllCommentsUseCase()
    const newComment = await createCommentUseCase.handler(page, limit)

    return res.status(200).json(newComment)
  } catch (error) {
    next(error)
  }
}
