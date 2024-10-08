import { CommentRepository } from '@/repositories/typeorm/comment.repository'
import { UpdateCommentUseCase } from '@/use-cases/comment/update-comment'

export function makeUpdateCommentUseCase() {
  const commentRepository = new CommentRepository()
  const updateCommentUseCase = new UpdateCommentUseCase(commentRepository)
  return updateCommentUseCase
}
