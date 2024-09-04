import { IPostRepository } from "../post.repository.interface";
import { database } from "@/lib/pg/db";
import { IPost } from "@/entities/models/post.interface";
import { ITeacher } from "@/entities/models/teacher.interface";

export class PostRepository implements IPostRepository {
    async findPostById(teacherId: number, page: number, limit: number): Promise<(IPost & ITeacher)[]> {
        const offset = (page - 1) * limit;
       
        const query = `SELECT * 
                        FROM 
                            posts
                        JOIN teachers ON teachers.id = posts.teacher_id
                        WHERE 
                            teachers.id = $1
                        LIMIT $2 OFFSET $3`;
        const result = await database.clientInstance?.query<(IPost & ITeacher)>(query, [teacherId, limit, offset]);
        return result?.rows || [];
    }

    async create({title, content, state, teacher_id}: IPost): Promise<IPost | undefined> {
        const result = await database.clientInstance?.query<IPost>(`
            INSERT INTO posts (title, content, state, teacher_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [title, content, state, teacher_id]);    
        return result?.rows[0];
    }
}