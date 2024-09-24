import { IPost } from '@/entities/models/post.interface'

export interface IPostRepository {
  create(post: IPost): Promise<IPost | undefined>
  findAll(page: number, limit: number, tagId?: number): Promise<IPost[]>
  findPostByIdTeacher(
    teacherId: number,
    page: number,
    limit: number,
  ): Promise<IPost[]>
  findPostById(id: string): Promise<IPost | undefined>
  updatePost(post: IPost): Promise<IPost | undefined>
  deletePost(id: string): Promise<void>
}
