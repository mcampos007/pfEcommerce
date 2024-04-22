import multer from 'multer';
import __dirname from '../helpers/utils.js';

const MIMETYPES = ['image/jpeg', 'image/png', 'application/pdf'];

// Configuracion MULTER
//Storage para profiles
const storage = multer.diskStorage({
  // ubicaion del directorio donde voy a guardar los archivos
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/images/profiles`);
  },

  // el nombre que quiero que tengan los archivos que voy a subir
  filename: function (req, file, cb) {
    // console.log(file);
    let extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
    cb(null, `profile-${Date.now()}${extension}`);
  },
});

//Storage para documents
const storageDocuments = multer.diskStorage({
  // ubicaion del directorio donde voy a guardar los archivos
  destination: function (req, file, cb) {
    const pathfile = `${__dirname}/public/images/documents`;
    cb(null, pathfile);
  },

  // el nombre que quiero que tengan los archivos que voy a subir
  filename: function (req, file, cb) {
    // console.log(file);
    let extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
    cb(null, `document-${Date.now()}${extension}`);
  },
});

export const uploadFiles = multer({
  storage,
  // si se genera algun error, lo capturamos
  onError: function (err, next) {
    console.log(err);
    next();
  },
});

export const uploadDocuments = multer({
  storage: multer.diskStorage({
    destination: `${__dirname}/public/images/`,
    filename(req, file, cb) {
      const fileExtension = file.originalname.slice(
        file.originalname.lastIndexOf('.')
      );
      const fileName = file.originalname.split(fileExtension)[0];
      cb(null, `${fileName}-${Date.now()}${fileExtension}`);
    },
  }),

  fileFilter: (req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) cb(null, true);
    else cb(new Error(`Only ${MIMETYPES.join(', ')} mimetype are allowed`));
  },
  limits: {
    fieldSize: 10000000,
  },
});
