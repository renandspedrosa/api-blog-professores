import { makeDeleteStudentUseCase } from '@/use-cases/factory/student/make-delete-student-use-case'
import { Request, Response, NextFunction } from 'express'

export async function deleteStudent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  const deleteStudentUseCase = makeDeleteStudentUseCase()

  try {
    await deleteStudentUseCase.handler(Number(id))
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}
