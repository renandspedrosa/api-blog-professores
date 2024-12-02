import { generateJwt } from '@/http/middlewares/jwt-validate'
import { makeFindWithTeacherUseCase } from '@/use-cases/factory/user/make-find-with-teacher'
import { makeFindWithStudentUseCase } from '@/use-cases/factory/user/make-find-with-student'
import { makeSigninUseCase } from '@/use-cases/factory/user/make-signin-use-case'
import { compare } from 'bcryptjs'
import { Request, Response, NextFunction } from 'express'

export async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body

    const signinUseCase = makeSigninUseCase()
    const findWithTeacherByIdUser = makeFindWithTeacherUseCase()
    const findWithStudentByIdUser = makeFindWithStudentUseCase()

    const user = await signinUseCase.handler(email)

    if (!user || user.id === undefined) {
      throw new Error('Credenciais inválidas')
    }

    const teacher = await findWithTeacherByIdUser.handler(user.id)

    const student = await findWithStudentByIdUser.handler(user.id)

    let type = null
    if (teacher && teacher.teachers && teacher.teachers.length > 0) {
      type = 'teacher'
    } else if (student && student.students && student.students.length > 0) {
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
