import { makeFindPostByTermUseCase } from '@/use-cases/factory/post/make-find-post-by-term-use-case'
import { Request, Response } from 'express'

export async function findPostByTerm(req: Request, res: Response) {
  const { term, page, limit } = req.body

  const findPostByTermUseCase = makeFindPostByTermUseCase()

  const post = await findPostByTermUseCase.handler(term, page, limit)

  return res.status(200).send(post)
}
