import { makeFindPostByTeacherUseCase } from '@/use-cases/factory/post/make-find-post-by-teacher-use-case'
import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export async function findPostByTeacher(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const registerParamsSchema = z.object({
      teacherId: z.coerce.number(),
    })

    const { teacherId } = registerParamsSchema.parse(req.params)
    const { page, limit } = req.body

    const findPostByTeacherUseCase = makeFindPostByTeacherUseCase()

    const post = await findPostByTeacherUseCase.handler(teacherId, page, limit)

    return res.status(200).send(post)
  } catch (error) {
    next(error)
  }
}
