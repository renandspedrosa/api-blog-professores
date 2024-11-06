import { Request, Response, NextFunction } from 'express'
import { makeCreatePostUseCase } from '@/use-cases/factory/post/make-create-post-use-case'

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const createPostUseCase = makeCreatePostUseCase()
    const { title, content, teacher_id, tags, path_img } = req.body
    const createdPost = await createPostUseCase.handler({
      title,
      content,
      path_img,
      teacher_id,
      tags,
    })
    return res.status(201).json(createdPost)
  } catch (error) {
    next(error)
  }
}
