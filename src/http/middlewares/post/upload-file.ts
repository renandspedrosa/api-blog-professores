import multer from 'multer'
import { Request, Response, NextFunction } from 'express'
import path from 'path'

// Configuração personalizada para salvar arquivos com extensão
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') // Diretório de destino
  },
  filename: (req, file, cb) => {
    // Gera um nome único para o arquivo com a extensão original
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const extension = path.extname(file.originalname)
    cb(null, `${uniqueSuffix}${extension}`)
  },
})

const upload = multer({ storage })

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  upload.single('attachment')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        error: 'Erro ao processar multipart/form-data',
        details: err.message,
      })
    }

    console.log('Campos do formulário:', req.body)
    console.log('Arquivo enviado:', req.file)

    next()
  })
}
