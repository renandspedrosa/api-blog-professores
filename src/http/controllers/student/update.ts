import { Request, Response, NextFunction } from 'express'
import { makeUpdateStudentUseCase } from '@/use-cases/factory/student/make-update-student-use-case'

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const { name } = req.body

    const updateStuedentUseCase = makeUpdateStudentUseCase()
    const student = await updateStuedentUseCase.handler({
      id: Number(id),
      name,
    })

    return res.status(201).json({ id: student.id, name: student.name })
  } catch (error) {
    next(error)
  }
}
