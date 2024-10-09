import { makeDeleteCommentUseCase } from '@/use-cases/factory/comment/delete-comment-use-case'
import { Request, Response, NextFunction } from 'express'

export async function deleteComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const deleteCommentUseCase = makeDeleteCommentUseCase()
    const { id } = req.params

    const deletedComment = await deleteCommentUseCase.handler(id)

    return res.status(204).json(deletedComment)
  } catch (error) {
    next(error)
  }
}
