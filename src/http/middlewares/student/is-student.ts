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
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const user_id = auth.id

    const findWithStudentUseCase = makeFindWithStudentUseCase()
    const user = await findWithStudentUseCase.handler(user_id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (!user.students || user.students.length === 0) {
      return res
        .status(403)
        .json({ message: 'Access denied. User is not a student.' })
    }

    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.format(),
      })
    }

    next(error)
  }
}
