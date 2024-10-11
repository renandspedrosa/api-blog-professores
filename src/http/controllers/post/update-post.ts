import { Request, Response, NextFunction } from 'express'
import { makeUpdatePostUseCase } from '@/use-cases/factory/post/make-update-post-use-case'

export async function updatePost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params
    const { title, content, tags } = req.body

    const updatePostUseCase = await makeUpdatePostUseCase()

    const post = await updatePostUseCase.handler({
      id,
      title,
      content,
      tags,
    })

    return res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}
