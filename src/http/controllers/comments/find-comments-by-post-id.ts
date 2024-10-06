import { makeGetCommentsByPostIdUseCase } from '@/use-cases/factory/comment/get-comments-by-post-id-use-case'
import { Request, Response, NextFunction } from 'express'

export async function findCommentsByPostId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { postId } = req.params
    const getCommentsByPostId = makeGetCommentsByPostIdUseCase()
    const comments = await (await getCommentsByPostId).handler(postId)

    res.status(200).json(comments)
  } catch (error) {
    next(error)
  }
}
