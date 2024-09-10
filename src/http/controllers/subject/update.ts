import { makeUpdateSubjectUseCase } from "@/use-cases/factory/make-update-subject";
import { Request, Response } from "express";

export async function update(req: Request, res: Response) {
    const { id } = req.params
    const { name, description, image, tags  } = req.body;

    const updateSubjectUseCase = makeUpdateSubjectUseCase();

    const subject = await updateSubjectUseCase.handler({
        id,
        name,
        description,
        image: image,
        tags: tags || []
    });

    return res.status(200).json(subject);
}