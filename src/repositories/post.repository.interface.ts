import { IPost } from '@/entities/models/post.interface'

export interface IPostRepository {
  create(post: IPost): Promise<IPost | undefined>
  findAll(
    page: number,
    limit: number,
    tagId?: Array<number>,
    term?: string,
  ): Promise<IPost[]>
  findPostByIdTeacher(
    teacherId: number,
    page: number,
    limit: number,
  ): Promise<IPost[]>
  findPostById(id: string): Promise<IPost | undefined>
  findPostByTextSearch(
    text: string,
    page: number,
    limit: number,
  ): Promise<IPost[]>
  updatePost(post: IPost): Promise<IPost | undefined>
  deletePost(id: string): Promise<void>
}
