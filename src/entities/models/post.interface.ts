import { IComment } from './comment.interface'
import { IPostViewed } from './post-viewed.interface'
import { ITag } from './tags.interface'
export interface IPost {
  id?: string
  title: string
  content: string
  path_img?: string
  status?: number
  created_at?: Date
  updated_at?: Date | null
  teacher_id?: number
  teacher?: {
    user?: {
      name?: string
    }
  }
  tags?: ITag[]
  comments?: IComment[]
  vieweds?: IPostViewed[]
  commentCount?: number
  viewedCount?: number
}
