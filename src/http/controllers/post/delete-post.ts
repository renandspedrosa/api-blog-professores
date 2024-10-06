import { Request, Response, NextFunction } from 'express'
import { makeDeletePostUseCase } from '@/use-cases/factory/post/make-delete-post-use-case'

export async function deletePost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params

    const deletePostUseCase = makeDeletePostUseCase()

    await deletePostUseCase.handler(id)

    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}
