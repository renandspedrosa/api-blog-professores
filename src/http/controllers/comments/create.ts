import { Request, Response, NextFunction } from 'express'
import { makeCreateCommentUseCase } from '@/use-cases/factory/comment/create-comment-use-case'

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const createCommentUseCase = makeCreateCommentUseCase()
    const { post_id } = req.params
    const { content, user_id } = req.body
    const newComment = await createCommentUseCase.handler({
      post_id,
      content,
      user_id,
    })
    return res.status(201).json(newComment)
  } catch (error) {
    next(error)
  }
}
