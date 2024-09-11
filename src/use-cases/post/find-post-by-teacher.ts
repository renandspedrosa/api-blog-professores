import { IPost } from "@/entities/models/post.interface";
import { ITeacher } from "@/entities/models/teacher.interface";
import { IPostRepository } from "@/repositories/post.repository.interface";

export class FindPostByTeacherUseCase {
  constructor(private postRepository: IPostRepository) {}

  async handler(teacherId: number, page: number, limit: number): Promise<(IPost & ITeacher)[]> {
    return this.postRepository.findPostById(teacherId, page, limit);
  }
}