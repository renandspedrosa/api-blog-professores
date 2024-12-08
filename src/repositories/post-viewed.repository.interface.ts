import { IPostViewed } from '@/entities/models/post-viewed.interface'

export interface IPostViewedRepository {
  create(postViewedData: IPostViewed): Promise<IPostViewed>
  postViewedExists(post_id: string, student_id: number): Promise<boolean>
}
