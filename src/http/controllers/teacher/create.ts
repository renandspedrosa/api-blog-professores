import { makeCreateTeacherUseCase } from '@/use-cases/factory/teacher/make-create-teacher-use-case'
import { Request, Response, NextFunction } from 'express'

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, user_id } = req.body

    const createTeacherUseCase = makeCreateTeacherUseCase()
    const teacher = await createTeacherUseCase.handler({ name, user_id })

    return res.status(201).json(teacher)
  } catch (error) {
    next(error)
  }
}
