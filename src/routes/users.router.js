import CustomRouter from './custom/custom.router.js';
import { validateUser } from '../helpers/validateUser.js';
import fs from 'fs';
import { promisify } from 'util';
import __dirname from '../helpers/utils.js';

import {
  getAll,
  current,
  premiumUserChange,
  adminUser,
  login,
  register,
  logout,
  findById,
  updateDocument,

  //sendLinkToPasswordReset,
} from '../controllers/users.controller.js';
import { uploadFiles, uploadDocuments } from '../helpers/multer.js';

// Utilidad para renombrar archivos de manera asíncrona
const renameFileAsync = promisify(fs.rename);

export default class UsersExtendRouter extends CustomRouter {
  init() {
    /*====================================================
                    EJEMPLO de como se conecta con el CustomRouter
                    --> this.verboHTTP(path, policies, ...callbacks);                   
        =====================================================*/
    // get all users
    this.get('/', ['ADMIN'], getAll);
    // Register a new user
    this.post('/register', ['PUBLIC'], validateUser, register);
    // Login
    this.post('/login', ['PUBLIC'], login);
    //Logout
    this.get('/logout', ['USER', 'ADMIN', 'PREMIUM'], logout);
    //Recover current user data
    this.get('/current', ['USER', 'PREMIUM', 'ADMIN'], current);
    //change user to premium and premium to user
    this.post('/premium/:uid', ['USER', 'PREMIUM'], premiumUserChange);

    this.get('/adminUser', ['ADMIN'], adminUser);

    this.post(
      '/:uid/documents',
      ['ADMIN', 'USER', 'PREMIUM'],
      uploadDocuments.array('file'),
      async (req, res) => {
        try {
          // console.log(1, req.files);
          // console.log(1, req.body.document);
          // console.log(1, req.body.tipofile);
          let cantFiles = 0;
          if (!req.files || req.files.length == 0 || !req.body)
            res.status(400).send({
              status: 'error',
              mensaje: 'No se adjunto archivo o falta especificar el tipo.',
            });
          else {
            try {
              // console.log(1, req.body);
              // console.log(4, req.files);
              const files = req.files;
              const tipofile = req.body.tipofile;
              // console.log(5, req.files);
              const destinodir = `${__dirname}/public/images/${tipofile}/`;
              // console.log(files.length);
              // console.log(files[0]);
              for (var i = 0; i < files.length; i++) {
                // console.log(1, files[i]);
                const oldPath = files[i].path;
                const newPath = destinodir + files[i].filename;

                // Mover el archivo
                // console.log(oldPath);
                // console.log(newPath);
                //const result = fs.renameSync(oldPath, newPath);
                const result = await renameFileAsync(oldPath, newPath);
                // console.log(result);
                //Actualizar users con los datos del archivo subido
                // console.log(1, req.user);

                const user = findById(req.params.uid);
                if (!user) {
                  // console.log(2, 'Error al recuperar el usuario');
                  // console.log(3, user);
                  res.status(400).send({ error: user });
                }
                const name = req.body.document; //files[i].fieldname;
                const reference = `images/${tipofile}/${files[i].filename}`;
                const newDocument = {
                  name: name,
                  reference: reference,
                };

                if (!user.documents) {
                  user.documents = [];
                }

                user.documents.push(newDocument);
                const status = `Se han subido ${
                  cantFiles + 1
                } de imágenes de ${tipofile}`;

                const data = {
                  uid: req.params.uid,
                  newDocument: newDocument,
                  status: status,
                };
                const resultUpdated = await updateDocument(data, res);
                console.log(resultUpdated);

                cantFiles++;
                console.log(4, resultUpdated);
              }
              res.sendStatus(200);
            } catch (error) {
              console.log(error);
            }

            // for (const data of files) {
            //   // mover los archivos descargados a la carpeta correspondiente
            //   console.log(3, data.filename);
            // }
          }
        } catch (error) {
          console.error('Error al procesar archivos:', error);
          res.status(500).send('Error interno del servidor');
        }
      }
    );
  }
}
