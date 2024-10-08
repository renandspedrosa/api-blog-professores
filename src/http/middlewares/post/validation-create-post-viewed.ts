import { NextFunction, Request, Response } from 'express'
import { z, ZodError } from 'zod'

export async function validateCreatePostViewed(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registerBodySchema = z.object({ user_id: z.coerce.number() })
  const registerParamsSchema = z.object({
    post_id: z.string(),
  })

  try {
    req.body = registerBodySchema.parse(req.body)
    req.params = registerParamsSchema.parse(req.params)

    // const { user_id } = req.body
    // const { post_id } = req.params

    // const postViewedReq: IPostViewed = { user_id: user_id, post_id: post_id }

    // const createPostViewedUseCase = makeCreatePostViewedUseCase()
    // const postViewed = await createPostViewedUseCase.handler(postViewedReq)
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.format(),
      })
    }
  }
}
