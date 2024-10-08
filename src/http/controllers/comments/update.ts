import { Request, Response, NextFunction } from 'express'
import { makeUpdateCommentUseCase } from '@/use-cases/factory/comment/update-comment-use-case'

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const updateCommentUseCase = makeUpdateCommentUseCase()
    const { id } = req.params
    const { content, user_id, post_id } = req.body

    const updatedComment = await updateCommentUseCase.handler({
      post_id: post_id as string,
      id: id as string,
      content,
      user_id,
    })
    return res.status(201).json(updatedComment)
  } catch (error) {
    next(error)
  }
}
