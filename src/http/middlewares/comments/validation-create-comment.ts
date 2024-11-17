import { makeFindUserByIdUseCase } from '@/use-cases/factory/user/make-find-user-by-id-use-case'
import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

interface AuthenticatedRequest extends Request {
  auth?: {
    id: number
    userType: string
  }
}

export async function validateCreateComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const commentParamsSchema = z.object({
      post_id: z.coerce.string(),
    })
    const commentBodySchema = z.object({
      content: z.coerce
        .string()
        .min(1, 'Comentário deve ter ao menos 1 caractere'),
    })

    const { auth } = req as AuthenticatedRequest

    if (!auth || !auth.id) {
      return res.status(401).json({ message: 'Não autorizado' })
    }

    const user_id: number = auth.id

    req.params = commentParamsSchema.parse(req.params)
    req.body = commentBodySchema.parse(req.body)

    const { post_id } = req.params
    const findWithUserUseCase = makeFindUserByIdUseCase()
    const user = await findWithUserUseCase.handler(user_id)
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    if (!post_id) {
      return res.status(404).json({ message: 'Postagem não encontrada' })
    }
    req.body.user_id = user_id
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
