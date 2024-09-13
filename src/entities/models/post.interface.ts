import { ITag } from "./tags.interface";
export interface IPost {
    id?: string;
    title: string;
    content: string;
    status?: number; 
    teacher_id: number;
    tags?: ITag[];
    created_at?: Date;
    updated_at?: Date | null;
}