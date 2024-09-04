import { makeCreateUserUseCase } from "@/use-cases/factory/make-create-user-use-case";
import { Request, Response, NextFunction } from "express";
export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, password } = req.body;
        const createUserUseCase = makeCreateUserUseCase();
        const user = await createUserUseCase.handler({ username, password });
        return res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}