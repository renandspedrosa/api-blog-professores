import { makeCreatePostViewedUseCase } from '@/use-cases/factory/post/make-create-post-viewed-use-case'
import { Request, Response, NextFunction } from 'express'

export async function createPostViewed(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const createPostViewedUseCase = makeCreatePostViewedUseCase()
    const { student_id } = req.body
    const { post_id } = req.params

    const postViewed = {
      student_id,
      post_id,
    }

    const createdPostViewed = await createPostViewedUseCase.handler(postViewed)
    return res.status(201).json(createdPostViewed)
  } catch (error) {
    next(error)
  }
}
