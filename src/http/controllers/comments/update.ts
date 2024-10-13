import { Request, Response, NextFunction } from 'express'
import { makeUpdateCommentUseCase } from '@/use-cases/factory/comment/update-comment-use-case'

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const updateCommentUseCase = makeUpdateCommentUseCase()
    const { id } = req.params
    const { content, user_id, post_id } = req.body

    const comment = {
      post_id: post_id as string,
      id: id as string,
      content,
      user_id,
    }
    await updateCommentUseCase.handler(comment)
    return res.status(201).json(comment)
  } catch (error) {
    next(error)
  }
}
