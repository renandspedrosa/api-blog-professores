import { makeCreateUserUseCase } from '@/use-cases/factory/user/make-create-user-use-case'
import { hash } from 'bcryptjs'
import { Request, Response, NextFunction } from 'express'
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body

    const hashedPassword = await hash(password, 8)

    const userWithHashedPassword = { email, password: hashedPassword }

    const createUserUseCase = makeCreateUserUseCase()

    const user = await createUserUseCase.handler(userWithHashedPassword)

    return user
      ? res.status(201).json({ id: user?.id, email: user?.email })
      : res.status(409).json({
          message: 'E-mail allready exists. Try another one',
        })
  } catch (error) {
    next(error)
  }
}
