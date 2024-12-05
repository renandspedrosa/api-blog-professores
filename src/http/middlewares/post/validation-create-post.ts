import { makeFindTeacherByIdUseCase } from '@/use-cases/factory/teacher/make-find-teacher-by-id-use-case'
import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

export async function validateCreatePost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Define o schema para validar os dados do corpo da requisição
  const registerBodySchema = z.object({
    title: z.string().min(1, { message: 'Título é obrigatório' }),
    content: z.string().min(1, { message: 'Conteúdo é obrigatório' }),
    path_img: z.string().optional(), // O arquivo será tratado separadamente
    teacher_id: z.coerce.number(),
    tags: z
      .array(
        z
          .object({
            id: z.coerce.number().optional(),
            name: z.string().optional(),
          })
          .refine((data) => data.id || data.name, {
            message: 'É necessário fornecer "id" ou "nome" para cada tag.',
            path: ['tags'],
          }),
      )
      .optional(),
  })
  try {
    // Valida os dados combinados
    req.body = registerBodySchema.parse(req.body)

    const { teacher_id } = req.body

    // Chama o use case para verificar se o professor existe
    const findWithTeacherUseCase = makeFindTeacherByIdUseCase()
    const teacher = await findWithTeacherUseCase.handler(teacher_id)

    if (!teacher) {
      return res.status(404).json({ message: 'Professor não encontrado' })
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
