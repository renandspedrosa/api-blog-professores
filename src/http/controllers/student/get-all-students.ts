import { makeGetAllStudentsUseCase } from '@/use-cases/factory/student/make-get-all-students-use-case'
import { NextFunction, Request, Response } from 'express'

export async function getAllStudents(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { page, limit } = req.body

    const findAllStudentsUseCase = makeGetAllStudentsUseCase()
    const students = await findAllStudentsUseCase.handler(page, limit)

    return res.status(200).json(students)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Estudante não encontrado') {
        return res.status(404).json([])
      }
    }
    next(error)
  }
}
