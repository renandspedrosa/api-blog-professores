import { makeFindWithTeacherUseCase } from '@/use-cases/factory/make-find-with-teacher'
import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export async function findUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const registerBodySchema = z.object({
      id: z.coerce.number(),
    })

    const { id } = registerBodySchema.parse(req.params)
    const findWithTeacherUseCase = makeFindWithTeacherUseCase()
    const user = await findWithTeacherUseCase.handler(id)

    if (!user) return res.status(404).json({ message: 'User not found' })
    return res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}
