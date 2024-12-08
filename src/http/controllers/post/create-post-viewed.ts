import { PostViewed } from '@/entities/post-viewed.entity'
import { makeCreatePostViewedUseCase } from '@/use-cases/factory/post/make-create-post-viewed-use-case'
import { makePostViewedUseCase } from '@/use-cases/factory/post/make-post-viwed-use-case'
import { makeFindWithStudentUseCase } from '@/use-cases/factory/user/make-find-with-student'
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
      return res.status(401).json({ message: 'Não autorizado' })
    }

    const createPostViewedUseCase = makeCreatePostViewedUseCase()
    const findWithStudentUseCase = makeFindWithStudentUseCase()
    const postViewedExists = makePostViewedUseCase()

    const user = await findWithStudentUseCase.handler(auth.id)

    const student_id = user?.students?.find(
      (student) => student.user_id === auth.id,
    )?.id
    const { post_id } = req.params

    if (!student_id) {
      return res
        .status(403)
        .json({ message: 'Acesso negado. O usuário não é um aluno.' })
    }

    const postViewedExist = await postViewedExists.handler(post_id, student_id)
    if (postViewedExist) {
      return res.status(200).json({ message: 'Postagem já visualizada' })
    }

    const postViewed = new PostViewed()
    postViewed.student_id = student_id
    postViewed.post_id = post_id
    const createdPostViewed = await createPostViewedUseCase.handler(postViewed)
    return res.status(201).json(createdPostViewed)
  } catch (error) {
    next(error)
  }
}
