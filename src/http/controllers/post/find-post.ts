import { makeFindPostUseCase } from '@/use-cases/factory/post/make-find-post-use-case'
import { Request, Response } from 'express'

export async function findPost(req: Request, res: Response) {
  try {
    const findPostUseCase = makeFindPostUseCase()
    const { id } = req.params
    const post = await findPostUseCase.handler(id)

    return res.status(200).json(post)
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
