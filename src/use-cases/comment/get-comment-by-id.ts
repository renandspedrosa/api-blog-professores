import { IComment } from '@/entities/models/comment.interface'
import { ICommentRepository } from '@/repositories/comment.repository.interface'

export class GetCommentByIdUseCase {
  constructor(private commentRepository: ICommentRepository) {}

  async handler(id: string): Promise<IComment | null> {
    const comment = await this.commentRepository.getById(id)

    if (!comment) throw new Error('Comentário não encontrado')

    return comment
  }
}
