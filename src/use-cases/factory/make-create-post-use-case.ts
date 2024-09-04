import { PostRepository } from "@/repositories/pg/post.repository";
import { CreatePostUseCase } from "../create-post";

export function makeCreatePostUseCase() {
    const postRepository = new PostRepository();
    const createPostUseCase = new CreatePostUseCase(postRepository);
    return createPostUseCase;
}