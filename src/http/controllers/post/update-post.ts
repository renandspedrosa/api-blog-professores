import { Request, Response, NextFunction } from 'express'
import { makeUpdatePostUseCase } from '@/use-cases/factory/post/make-update-post-use-case'

export async function updatePost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params
    const { title, content, path_img, tags } = req.body

    const updatePostUseCase = await makeUpdatePostUseCase()

    const post = await updatePostUseCase.handler({
      id,
      title,
      content,
      path_img,
      tags,
    })

    return res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}
