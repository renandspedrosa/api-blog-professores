import { makeGetCommentByIdUseCase } from '@/use-cases/factory/comment/get-comment-by-id-use-case'
import { makeFindUserByIdUseCase } from '@/use-cases/factory/user/make-find-user-by-id-use-case'
import { makeFindTeacherByIdUseCase } from '@/use-cases/factory/teacher/make-find-teacher-by-id-use-case'
import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

export async function validateDeleteComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const commentParamsSchema = z.object({
      id: z.coerce.string(),
    })

    const commentBodySchema = z.object({
      user_id: z.coerce.number(),
    })

    req.params = commentParamsSchema.parse(req.params)
    req.body = commentBodySchema.parse(req.body)

    const { id } = req.params
    const { user_id } = req.body

    const getCommentUseCase = makeGetCommentByIdUseCase()
    const comment = await getCommentUseCase.handler(id)

    if (!comment) return res.status(404).json({ message: 'Comment not found' })

    const findWithUserUseCase = makeFindUserByIdUseCase()
    const user = await findWithUserUseCase.handler(user_id)

    if (!user) return res.status(404).json({ message: 'User not found' })

    const findTeacherUseCase = makeFindTeacherByIdUseCase()
    const teacherUser = await findTeacherUseCase.handler(user_id)

    if (comment.user_id !== user.id || !teacherUser) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.format(),
      })
    }

    next(error)
  }
}
