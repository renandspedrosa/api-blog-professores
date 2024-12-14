import { makeUpdateUserUseCase } from '@/use-cases/factory/user/make-update-user-use-case'
import { hash } from 'bcryptjs'
import { Request, Response, NextFunction } from 'express'

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params

    const { name, email, password } = req.body

    let hashedPassword = password
    if (password) {
      hashedPassword = await hash(password, 8)
    }

    const userWithHashedPassword = {
      id: Number(id),
      name,
      email,
      password: hashedPassword,
    }

    const updateUserUseCase = makeUpdateUserUseCase()
    const User = await updateUserUseCase.handler(userWithHashedPassword)

    return res.status(201).json({ id: User.id, name: User.name })
  } catch (error) {
    next(error)
  }
}
