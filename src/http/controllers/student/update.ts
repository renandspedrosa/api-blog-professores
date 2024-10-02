import { Request, Response, NextFunction } from 'express'
import { makeUpdateTeacherUseCase } from '@/use-cases/factory/teacher/make-update-teacher-use-case'

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const { name } = req.body

    const updateTeacherUseCase = makeUpdateTeacherUseCase()
    const teacher = await updateTeacherUseCase.handler({
      id: Number(id),
      name,
    })

    return res.status(201).json({ id: teacher.id, name: teacher.name })
  } catch (error) {
    next(error)
  }
}
