import { IPost } from "@/entities/models/post.interface";
import { ITeacher } from "@/entities/models/teacher.interface";

export interface IPostRepository {
    findPostById(teacherId: number, page: number, limit: number): Promise<(IPost & ITeacher)[]>;
    create(post: IPost): Promise<IPost | undefined>;
}