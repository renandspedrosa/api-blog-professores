import { Request, Response } from 'express'
import { makeCreatePostUseCase } from '@/use-cases/factory/make-create-post-use-case'

export async function create(req: Request, res: Response) {
  const createPostUseCase = makeCreatePostUseCase()
  const { title, content, teacher_id, tags } = req.body
  const createdPost = await createPostUseCase.handler({
    title,
    content,
    teacher_id,
    tags,
  })
  return res.status(201).json(createdPost)
}
