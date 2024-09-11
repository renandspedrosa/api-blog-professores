import { PostRepository } from "@/repositories/pg/post.repository";
import { FindPostByTeacherUseCase } from "../post/find-post-by-teacher";

export function makeFindPostByTeacherUseCase() {
    const postRepository = new PostRepository();
    const findPostByTeacherUseCase = new FindPostByTeacherUseCase(postRepository);
    return findPostByTeacherUseCase;
}