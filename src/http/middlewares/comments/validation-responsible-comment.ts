import { makeGetCommentByIdUseCase } from '@/use-cases/factory/comment/get-comment-by-id-use-case'
import { Request, Response, NextFunction } from 'express'

interface AuthenticatedRequest extends Request {
  auth?: {
    id: number
    userType: string
  }
}

export async function validateResponsibleComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { auth } = req as AuthenticatedRequest

    if (!auth || !auth.id) {
      return res.status(401).json({ message: 'Não autorizado' })
    }

    const user_id: number = auth.id
    const { id } = req.params

    const findCommentByIdUseCase = makeGetCommentByIdUseCase()
    const comment = await findCommentByIdUseCase.handler(id)

    if (!comment) {
      return res.status(404).json({ message: 'Comentário não encontrado' })
    }

    if (comment.user_id !== user_id) {
      return res
        .status(401)
        .json({ message: 'O usuário não é o responsável pelo comentário.' })
    }
    next()
  } catch (error) {
    next(error)
  }
}
