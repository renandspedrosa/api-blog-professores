import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'

export function validationGetAllComments(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerParamsSchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
  })
  try {
    const parsedQuery = registerParamsSchema.parse(req.query)
    req.query.page = parsedQuery.page.toString()
    req.query.limit = parsedQuery.limit.toString()
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
