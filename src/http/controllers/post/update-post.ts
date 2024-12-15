import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { makeUpdatePostUseCase } from '@/use-cases/factory/post/make-update-post-use-case';

export async function updatePost(
    req: Request,
    res: Response,
    next: NextFunction,
) {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const filePath = req.file ? req.file.path : null;

    console.log('Arquivo salvo em:', filePath);

    const updatePostUseCase = await makeUpdatePostUseCase();

    const updatedPost = await updatePostUseCase.handler({
      id,
      title,
      content,
      path_img: filePath ? path.relative(process.cwd(), filePath) : req.body.path_img,
      tags,
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
}
