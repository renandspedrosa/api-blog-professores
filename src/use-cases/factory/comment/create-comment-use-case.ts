import { CommentRepository } from '@/repositories/typeorm/comment.repository'
import { CreateCommentUseCase } from '@/use-cases/comment/create-comment'

export function makeCreateCommentUseCase() {
  const commentRepository = new CommentRepository()
  const createCommentUseCase = new CreateCommentUseCase(commentRepository)
  return createCommentUseCase
}
