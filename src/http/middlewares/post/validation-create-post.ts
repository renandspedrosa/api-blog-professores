import { makeFindTeacherByIdUseCase } from '@/use-cases/factory/teacher/make-find-teacher-by-id-use-case'
import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

export async function validateCreatePost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerBodySchema = z.object({
    title: z.string(),
    content: z.string(),
    teacher_id: z.coerce.number(),
    tags: z
      .array(
        z
          .object({
            id: z.coerce.number().optional(),
            name: z.string().optional(),
          })
          .refine((data) => data.id || data.name, {
            message: 'Either "id" or "name" must be provided for each tag',
            path: ['tags'],
          }),
      )
      .optional(),
  })

  try {
    req.body = registerBodySchema.parse(req.body)
    const { teacher_id } = req.body
    const findWithTeacherUseCase = makeFindTeacherByIdUseCase()
    const teacher = await findWithTeacherUseCase.handler(teacher_id)
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' })
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
