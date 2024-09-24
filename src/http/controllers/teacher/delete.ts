import { makeDeleteTeacherUseCase } from '@/use-cases/factory/teacher/make-delete-teacher-use-case'
import { Request, Response, NextFunction } from 'express'

export async function deleteTeacher(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  const deleteTeacherUseCase = makeDeleteTeacherUseCase()

  try {
    await deleteTeacherUseCase.handler(Number(id))
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}
