import { IPostRepository } from "../post.repository.interface";
import { Repository, EntityRepository } from "typeorm";
import { Post } from "@/entities/post.entity";
import { Teacher } from "@/entities/teacher.entity";
import { appDataSource } from "@/lib/typeorm/typeorm";
import { IPost } from "@/entities/models/post.interface";
import { ITeacher } from "@/entities/models/teacher.interface";

export class PostRepository implements IPostRepository {
    private postRepository: Repository<Post>;

    constructor() {
        this.postRepository = appDataSource.getRepository(Post);
    }

    async create(postData: IPost): Promise<IPost | undefined> {
        const post = this.postRepository.create(postData);
        return this.postRepository.save(post);
    }

    async findPostById(teacherId: number, page: number, limit: number): Promise<(IPost & ITeacher)[]> {
        // const offset = (page - 1) * limit;
        
        // const posts = await this.postRepository
        //     .createQueryBuilder('post')
        //     .leftJoinAndSelect('post.teacher', 'teacher')
        //     .where('teacher.id = :teacherId', { teacherId })
        //     .skip(offset)
        //     .take(limit)
        //     .getMany();
        
        // return posts;
        return [];
    }


}