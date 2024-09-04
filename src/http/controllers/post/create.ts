import { Request, Response } from "express";
import { makeCreatePostUseCase } from "@/use-cases/factory/make-create-post-use-case";

export async function create(req: Request, res: Response) {
    const createPostUseCase = makeCreatePostUseCase();
    const createdPost = await createPostUseCase.handler(req.body);
    return res.status(201).json(createdPost);
}