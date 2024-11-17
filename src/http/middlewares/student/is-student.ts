import { makeFindWithStudentUseCase } from '@/use-cases/factory/user/make-find-with-student'
import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

interface AuthenticatedRequest extends Request {
  auth?: {
    id: number
    userType: string
  }
}

export async function isStudent(
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

    const findWithStudentUseCase = makeFindWithStudentUseCase()
    const user = await findWithStudentUseCase.handler(user_id)

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    if (!user.students || user.students.length === 0) {
      return res
        .status(403)
        .json({ message: 'Acesso negado. Usuário não é um estudante.' })
    }

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
