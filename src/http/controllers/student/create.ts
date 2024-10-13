import { makeCreateStudentUseCase } from '@/use-cases/factory/student/make-create-student-use-case'
import { makeCreateUserUseCase } from '@/use-cases/factory/user/make-create-user-use-case'
import { hash } from 'bcryptjs'
import { Request, Response, NextFunction } from 'express'

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body

    const hashedPassword = await hash(password, 8)
    const userWithHashedPassword = { name, email, password: hashedPassword }

    const createUserUseCase = makeCreateUserUseCase()
    const newUser = await createUserUseCase.handler(userWithHashedPassword)

    const createStudentUseCase = makeCreateStudentUseCase()
    const student = await createStudentUseCase.handler({
      user_id: Number(newUser.id),
    })

    return res.status(201).json({ name, email, students: student })
  } catch (error) {
    next(error)
  }
}
