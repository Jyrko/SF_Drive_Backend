import { diskStorage } from 'multer';

export const STORAGE_MULTER_CONFIG = {
    storage: diskStorage({
      destination: './files',
      filename: (req, file, callback) => {
        callback(null, file.originalname)
      }
    })
};

export const STORAGE_MULTER_CONFIG_CARS = {
    storage: diskStorage({
      destination: './files/cars',
      filename: (req, file, callback) => {
        callback(null, file.originalname)
      }
    })
};

export const SECRET_KEY = "FYkjhvajHRivuFASdgkuyF"
export const JWT_REG_OBJECT = {
  secret: SECRET_KEY,
  signOptions: { expiresIn: '1d' }
};

export const MONGODB_PASSWORD = "Ekn57UKsmmhSrIBU";
