import { makeGetCommentsByPostIdUseCase } from '@/use-cases/factory/comment/get-comments-by-post-id-use-case'
import { Request, Response, NextFunction } from 'express'

export async function findCommentsByPostId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params
    const { page, limit } = req.query
    const getCommentsByPostId = await makeGetCommentsByPostIdUseCase()
    const comments = await getCommentsByPostId.handler(
      id,
      Number(page),
      Number(limit),
    )

    res.status(200).json(comments)
  } catch (error) {
    next(error)
  }
}
