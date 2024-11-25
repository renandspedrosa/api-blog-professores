import { generateJwt } from '@/http/middlewares/jwt-validate'
import { makeFindStudentByIdUseCase } from '@/use-cases/factory/student/make-find-student-by-id-use-case'
import { makeFindTeacherByIdUseCase } from '@/use-cases/factory/teacher/make-find-teacher-by-id-use-case'
import { makeSigninUseCase } from '@/use-cases/factory/user/make-signin-use-case'
import { compare } from 'bcryptjs'
import { Request, Response, NextFunction } from 'express'

export async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body

    const signinUseCase = makeSigninUseCase()
    const findWithTeacherById = makeFindTeacherByIdUseCase()
    const findWithStudentById = makeFindStudentByIdUseCase()

    const user = await signinUseCase.handler(email)

    if (!user || user.id === undefined) {
      throw new Error('Credenciais inválidas')
    }

    const teacher = await findWithTeacherById.handler(user.id)

    const student = await findWithStudentById.handler(user.id)

    let type = null
    if (teacher) {
      type = 'teacher'
    } else if (student) {
      type = 'student'
    }

    const doestPasswordMatch = await compare(password, user.password)

    if (!doestPasswordMatch) {
      throw new Error('Credenciais inválidas')
    }
    const plainUser = {
      id: user.id,
      email: user.email,
      type,
    }
    
    const token = generateJwt(plainUser)
    return res
      .status(200)
      .json({ token, user: { email: user.email, name: user.name } })
  } catch (error) {
    next(error)
  }
}
