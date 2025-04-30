import { File } from 'buffer';
import { Request } from 'express';
import multer, { StorageEngine } from 'multer';
import path from 'path';

const storage: StorageEngine = multer.diskStorage({
  destination: (req:Request, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); 
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      return cb(new Error('Fayl tipi uyğun deyil, yalnız şəkil fayllarına icazə verilir!') as any, false);
    }
  }
});
 
