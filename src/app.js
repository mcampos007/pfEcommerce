import express from 'express';
import config from './config/config.js';
import MongoSingleton from './config/mongodb-singleton.js';
import initSocket from './socket/socketManager.js';
import cookieParser from 'cookie-parser';
import { addLogger } from './helpers/logger.js';
import __dirname from './helpers/utils.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpres from 'swagger-ui-express';

// configuracion del servidor express
const app = express();

//Middlewre para failitar el uso de cookies
const cookieParserMiddleware = cookieParser(config.privatekey);
app.use(cookieParserMiddleware);

//IMplementacion de Logger
app.use(addLogger);

//documentacion
const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentacion de  la API',
      description: 'Documentación de la API ecommerce',
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/apidocs', swaggerUiExpres.serve, swaggerUiExpres.setup(specs));

//Inicio del servidor y configuración de sockets
const httpServer = app.listen(config.port, () => {});

//Implementación Mongo
const mongoInstance = async () => {
  try {
    await MongoSingleton.getInstance();
  } catch (error) {
    // console.log(error);
    process.exit();
  }
};
mongoInstance();

initSocket(httpServer);
