import { makeGetAllTeachersUseCase } from '@/use-cases/factory/teacher/make-get-all-teachers-use-case'
import { NextFunction, Request, Response } from 'express'

export async function getAllTeachers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { page, limit } = req.body

    const findAllTeachersUseCase = makeGetAllTeachersUseCase()
    const teachers = await findAllTeachersUseCase.handler(page, limit)

    return res.status(200).json(teachers)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Professor não encontrado') {
        return res.status(404).json([])
      }
    }
    next(error)
  }
}
