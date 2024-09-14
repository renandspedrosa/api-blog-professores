import { ITag } from './tags.interface'
export interface IPost {
  id?: string
  title: string
  content: string
  status?: number
  created_at?: Date
  updated_at?: Date | null
  teacher_id: number
  tags?: ITag[]
}
