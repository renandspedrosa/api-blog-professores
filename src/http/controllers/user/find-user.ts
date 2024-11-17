import { makeFindWithTeacherUseCase } from '@/use-cases/factory/user/make-find-with-teacher'
import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { makeFindWithStudentUseCase } from '@/use-cases/factory/user/make-find-with-student'

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
    const teacher = await findWithTeacherUseCase.handler(id)

    const findWithStudent = makeFindWithStudentUseCase()
    const student = await findWithStudent.handler(id)

    const user = student || teacher

    if (!user)
      return res.status(404).json({ message: 'Usuário não encontrado' })

    if (student) {
      user.students = student.students
    }
    if (teacher) {
      user.teachers = teacher.teachers
    }
    return res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}
