import { diskStorage } from 'multer';

export const STORAGE_MULTER_CONFIG = {
    storage: diskStorage({
      destination: './files',
      filename: (req, file, callback) => {
        callback(null, file.originalname)
      }
    })
};
