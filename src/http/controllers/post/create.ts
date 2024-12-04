import { Request, Response, NextFunction } from 'express'
import { makeCreatePostUseCase } from '@/use-cases/factory/post/make-create-post-use-case'
import path from 'path';
import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });


export async function create(req: Request, res: Response, next: NextFunction) {
  // console.log(req); return false;
  try {
    const upload = multer({ dest:'@/uploads/' });
    upload.single('attachment')(req, res, async (err) => {
     console.log(req)
      const createPostUseCase = makeCreatePostUseCase();
      const { title, content, teacher_id, tags } = req.body;

      const filePath = req.file ? req.file.path : null;
      console.log('req.file:', req.file);
      console.log('req.body:', req.body);

      const createdPost = await createPostUseCase.handler({
        title,
        content,
        path_img: filePath ? path.relative(process.cwd(), filePath) : null,
        teacher_id,
        tags,
      });

      return res.status(201).json(createdPost);
    });
  } catch (error) {
    next(error);
  }
}
