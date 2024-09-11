import { PostRepository } from "@/repositories/pg/post.repository";
import { CreatePostUseCase } from "../post/create-post";

export function makeCreatePostUseCase() {
    const postRepository = new PostRepository();
    const createPostUseCase = new CreatePostUseCase(postRepository);
    return createPostUseCase;
}