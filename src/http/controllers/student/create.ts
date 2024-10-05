import { makeCreateStudentUseCase } from '@/use-cases/factory/student/make-create-student-use-case'
import { Request, Response, NextFunction } from 'express'

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, user_id } = req.body

    const createStudentUseCase = makeCreateStudentUseCase()
    const student = await createStudentUseCase.handler({ name, user_id })

    return res.status(201).json(student)
  } catch (error) {
    next(error)
  }
}
