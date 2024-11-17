import { makeFindPostUseCase } from '@/use-cases/factory/post/make-find-post-use-case'
import { Request, Response, NextFunction } from 'express'

export async function findPost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const findPostUseCase = makeFindPostUseCase()
    const { id } = req.params
    const post = await findPostUseCase.handler(id)

    return res.status(200).json(post)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Postagem não encontrada') {
        return res.status(404).json([])
      }
    }
    next(error)
  }
}
