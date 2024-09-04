import { makeFindPostByTeacherUseCase } from '@/use-cases/factory/make-find-post-by-teacher-use-case';
import { Request, Response } from "express";
import { z } from 'zod'

export async function findPost(req: Request, res: Response) {
  const registerParamsSchema = z.object({
    teacherId: z.coerce.number(),
  })

  const registerQuerySchema = z.object({
    page: z.coerce.number(),
    limit: z.coerce.number(),
  })

  const { teacherId } = registerParamsSchema.parse(req.params)
  const { page, limit } = registerQuerySchema.parse(req.query)

  const findPostByTeacherUseCase = makeFindPostByTeacherUseCase()

  const post = await findPostByTeacherUseCase.handler(
    teacherId,
    page,
    limit,
  )

  return res.status(200).send(post)
}