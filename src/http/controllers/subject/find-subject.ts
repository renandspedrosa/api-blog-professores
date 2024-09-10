
import { makeFindSubjectUseCase } from "@/use-cases/factory/make-find-subject-use-case";
import { Request, Response } from "express";

export async function findSubject(req: Request, res: Response) {

    const findSubjectUseCase = makeFindSubjectUseCase();
    const { id } = req.params
    const subject = await findSubjectUseCase.handler(id);

    return res.status(200).json(subject);
}