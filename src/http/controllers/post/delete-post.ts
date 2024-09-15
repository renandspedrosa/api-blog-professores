import { Request, Response } from 'express'
import { makeDeletePostUseCase } from '@/use-cases/factory/post/make-delete-post-use-case'

export async function deletePost(req: Request, res: Response) {
  const deletePostUseCase = makeDeletePostUseCase()
  const { id } = req.params
  const deletedPost = await deletePostUseCase.handler(id)

  return res.status(201).json(deletedPost)
}
