import { makeDeleteCommentUseCase } from '@/use-cases/factory/comment/delete-comment-use-case'
import { makeFindUserByIdUseCase } from '@/use-cases/factory/user/make-find-user-by-id-use-case'
import { Request, Response, NextFunction } from 'express'

export async function deleteComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const deleteCommentUseCase = makeDeleteCommentUseCase()
    const { id } = req.params
    const { user_id } = req.body

    const findWithUserUseCase = makeFindUserByIdUseCase()
    const user = await findWithUserUseCase.handler(user_id)

    if (!user) return res.status(404).json({ message: 'User not found' })

    const deletedComment = await deleteCommentUseCase.handler(id)

    return res.status(204).json(deletedComment)
  } catch (error) {
    next(error)
  }
}
