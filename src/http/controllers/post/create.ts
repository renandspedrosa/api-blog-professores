import { Request, Response, NextFunction } from 'express'
import path from 'path'
import { makeCreatePostUseCase } from '@/use-cases/factory/post/make-create-post-use-case'

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, content, teacher_id, tags } = req.body
    const filePath = req.file ? req.file.path : null

    console.log('Arquivo salvo em:', filePath)

    const createPostUseCase = makeCreatePostUseCase()

    const createdPost = await createPostUseCase.handler({
      title,
      content,
      path_img: filePath ? path.relative(process.cwd(), filePath) : null,
      teacher_id,
      tags,
    })

    return res.status(201).json(createdPost)
  } catch (error) {
    next(error)
  }
}
