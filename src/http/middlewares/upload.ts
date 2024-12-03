import multer from 'multer';
import path from 'path';

// Defina onde os arquivos serão armazenados
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Diretório onde os arquivos serão armazenados
    },
    filename: function (req, file, cb) {
        // Defina um nome único para cada arquivo
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });
