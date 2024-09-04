import { makeCreateTeacherUseCase } from "@/use-cases/factory/make-create-teacher-use-case";
import { Request, Response, NextFunction } from "express";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const { cpf, name, birth, email, user_id } = req.body;

        const createTeacherUseCase = makeCreateTeacherUseCase();
        const teacher = await createTeacherUseCase.handler({ cpf, name, birth, email, user_id });

        return res.status(201).json(teacher);
    } catch (error) {
        next(error);
    }
}