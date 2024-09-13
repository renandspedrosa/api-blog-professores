import { IPost } from "@/entities/models/post.interface";
import { ITeacher } from "@/entities/models/teacher.interface";

export interface IPostRepository {
    create(post: IPost): Promise<IPost | undefined>;
    findPostByIdTeacher(teacherId: number, page: number, limit: number): Promise<(IPost)[]>;
}