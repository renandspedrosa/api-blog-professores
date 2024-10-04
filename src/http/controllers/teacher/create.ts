import { makeCreateTeacherUseCase } from '@/use-cases/factory/teacher/make-create-teacher-use-case'
import { makeCreateUserUseCase } from '@/use-cases/factory/user/make-create-user-use-case'
import { hash } from 'bcryptjs'
import { Request, Response, NextFunction } from 'express'

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body

    const hashedPassword = await hash(password, 8)
    const userWithHashedPassword = { email, password: hashedPassword }

    const createUserUseCase = makeCreateUserUseCase()
    const newUser = await createUserUseCase.handler(userWithHashedPassword)

    const createTeacherUseCase = makeCreateTeacherUseCase()
    const teacher = await createTeacherUseCase.handler({
      name,
      user_id: Number(newUser.id),
    })

    return res.status(201).json(teacher)
  } catch (error) {
    next(error)
  }
}
