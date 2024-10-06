import { Request, Response, NextFunction } from 'express'
import { makeCreateCommentUseCase } from '@/use-cases/factory/comment/create-comment-use-case'

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const createCommentUseCase = makeCreateCommentUseCase()
    const { post_id } = req.params
    const { content, user_id } = req.body
    const commentData = {
      post_id,
      content,
      user_id,
    }
    await createCommentUseCase.handler(commentData)
    return res.status(201).json(commentData)
  } catch (error) {
    next(error)
  }
}
