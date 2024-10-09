import { Request, Response, NextFunction } from 'express'
import { makeGetAllCommentsUseCase } from '@/use-cases/factory/comment/get-all-comments-use-case'

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = req.query

    const createCommentUseCase = makeGetAllCommentsUseCase()
    const comments = await createCommentUseCase.handler(
      Number(page),
      Number(limit),
    )

    return res.status(200).json(comments)
  } catch (error) {
    next(error)
  }
}
