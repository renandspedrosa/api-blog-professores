import { makeCreatePostViewedUseCase } from '@/use-cases/factory/post/make-create-post-viewed-use-case'
import { makeFindWithStudentUseCase } from '@/use-cases/factory/student/make-find-with-student'
import { Request, Response, NextFunction } from 'express'

interface AuthenticatedRequest extends Request {
  auth?: {
    id: number
    userType: string
  }
}
export async function createPostViewed(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { auth } = req as AuthenticatedRequest

    if (!auth || !auth.id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const createPostViewedUseCase = makeCreatePostViewedUseCase()
    const findWithStudentUseCase = makeFindWithStudentUseCase()

    const user = await findWithStudentUseCase.handler(auth.id)

    const student_id = user?.students?.find(
      (student) => student.user_id === auth.id,
    )?.id
    const { post_id } = req.params

    if (!student_id) {
      return res
        .status(403)
        .json({ message: 'Access denied. User is not a student.' })
    }

    const postViewed = { post_id, student_id }
    const createdPostViewed = await createPostViewedUseCase.handler(postViewed)
    return res.status(201).json(createdPostViewed)
  } catch (error) {
    next(error)
  }
}
