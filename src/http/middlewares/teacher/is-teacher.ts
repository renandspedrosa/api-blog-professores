import { makeFindWithTeacherUseCase } from '@/use-cases/factory/user/make-find-with-teacher'
import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

interface AuthenticatedRequest extends Request {
  auth?: {
    id: number // Tipo esperado do userId
    userType: string // Caso precise verificar se o user é teacher ou aluno
  }
}

export async function isTeacher(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { auth } = req as AuthenticatedRequest

    if (!auth || !auth.id) {
      return res.status(401).json({ message: 'Não autorizado' })
    }

    const user_id = auth.id

    const findWithTeacherUseCase = makeFindWithTeacherUseCase()
    const user = await findWithTeacherUseCase.handler(user_id)

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    if (!user.teachers || user.teachers.length === 0) {
      return res
        .status(403)
        .json({ message: 'Acesso negado. O usuário não é um professor.' })
    }
    req.body.teacher_id = user.teachers[0].id
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validação falhou',
        errors: error.format(),
      })
    }

    next(error)
  }
}
