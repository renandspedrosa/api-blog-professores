import { makeDeleteCommentUseCase } from '@/use-cases/factory/comment/delete-comment-use-case'
import { makeFindPostUseCase } from '@/use-cases/factory/post/make-find-post-use-case'
import { Request, Response, NextFunction } from 'express'

export async function deleteComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const findPostUseCase = makeFindPostUseCase()
    const deleteCommentUseCase = makeDeleteCommentUseCase()
    const { postId, commentId } = req.params

    const foundPost = await findPostUseCase.handler(postId)

    if (!foundPost) throw new Error('Post not found')

    const deletedComment = await deleteCommentUseCase.handler(commentId)

    return res.status(204).json(deletedComment)
  } catch (error) {
    next(error)
  }
}
