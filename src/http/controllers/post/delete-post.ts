import { Request, Response } from 'express'
import { makeDeletePostUseCase } from '@/use-cases/factory/post/make-delete-post-use-case'

export async function deletePost(req: Request, res: Response) {
  const { id } = req.params

  const deletePostUseCase = makeDeletePostUseCase()

  await deletePostUseCase.handler(id)

  return res.status(204).send()
}
