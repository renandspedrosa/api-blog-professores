import { makeFindAllPostUseCase } from '@/use-cases/factory/post/make-find-all-post-use-case'
import { Request, Response } from 'express'

export async function findAllPost(req: Request, res: Response) {
  try {
    const { page, limit } = req.body
    const findAllPostUseCase = makeFindAllPostUseCase()
    const posts = await findAllPostUseCase.handler(page, limit)

    return res.status(200).json(posts)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Post not found') {
        return res.status(404).json({})
      } else {
        console.error('Unexpected error:', error)
        return res.status(500).json({ message: 'An unexpected error occurred' })
      }
    } else {
      console.error('Unexpected error type:', error)
      return res.status(500).json({ message: 'An unexpected error occurred' })
    }
  }
}
