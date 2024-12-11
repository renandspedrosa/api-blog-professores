import { Repository } from 'typeorm'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { IComment } from '@/entities/models/comment.interface'
import { Comment } from '@/entities/comment.entity'
import { ICommentRepository } from '@/repositories/comment.repository.interface'

export class CommentRepository implements ICommentRepository {
  private repository: Repository<Comment>

  constructor() {
    this.repository = appDataSource.getRepository(Comment)
  }

  async create(commentData: IComment): Promise<IComment | undefined> {
    const newComment = this.repository.create(commentData)
    return this.repository.save(newComment)
  }

  async getAllComments(page: number, limit: number): Promise<IComment[]> {
    return this.repository.find({
      where: { status: 1 },
      skip: (page - 1) * limit,
      take: limit,
    })
  }

  async getById(id: string): Promise<IComment | null> {
    return this.repository.findOne({
      where: { id, status: 1 },
    })
  }

  async getCommentsByPostId(
    post_id: string,
    page: number,
    limit: number,
  ): Promise<IComment[]> {
    const pageNumber = Number(page) || 1
    const limitNumber = Number(limit) || 10

    const comments = await this.repository.find({
      relations: ['user'],
      where: { post_id, status: 1 },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    })
    comments.forEach((comment) => {
      comment.user = {
        id: comment.user.id,
        name: comment.user.name,
        email: comment.user.email,
        password: undefined,
      }
    })
    return comments
  }

  async update(comment: IComment): Promise<IComment> {
    const updatedComment = {
      ...comment,
      updated_at: new Date(),
    }
    return this.repository.save(updatedComment)
  }

  async delete(commentId: string): Promise<void> {
    await this.repository.update(commentId, { status: 0 })
  }
}
