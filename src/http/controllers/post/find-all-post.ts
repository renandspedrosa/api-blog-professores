import { makeFindAllPostUseCase } from '@/use-cases/factory/post/make-find-all-post-use-case'
import { Request, Response, NextFunction } from 'express'

export async function findAllPost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { page, limit, tag, term } = req.body
    const findAllPostUseCase = makeFindAllPostUseCase()
    const posts = await findAllPostUseCase.handler(page, limit, tag, term)

    return res.status(200).json(posts)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Postagem não encontrada') {
        return res.status(404).json([])
      }
    }
    next(error)
  }
}
