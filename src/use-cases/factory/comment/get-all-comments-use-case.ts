import { CommentRepository } from '@/repositories/typeorm/comment.repository'
import { GetAllCommentsUseCase } from '@/use-cases/comment/get-all-comments'

export function makeGetAllCommentsUseCase() {
  const commentRepository = new CommentRepository()
  const getAllCommentsUseCase = new GetAllCommentsUseCase(commentRepository)
  return getAllCommentsUseCase
}
