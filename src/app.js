import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import config from './config/config.js';
import MongoSingleton from './config/mongodb-singleton.js';
import initSocket from './socket/socketManager.js';
import cookieParser from 'cookie-parser';
import { addLogger } from './helpers/logger.js';
import __dirname from './helpers/utils.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpres from 'swagger-ui-express';
import cors from 'cors';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import handlebars from 'express-handlebars';
import ViewsRouter from './routes/views.router.js';
import UsersdRouter from './routes/users.router.js';
import EmailRouter from './routes/email.router.js';
import smsRouter from './routes/sms.router.js';
import PasswwordRouter from './routes/password.router.js';

// configuracion del servidor express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

//Middlewre para failitar el uso de cookies
const cookieParserMiddleware = cookieParser(config.privatekey);
app.use(cookieParserMiddleware);

//IMplementacion de Logger
app.use(addLogger);

//Configuración de sesiones
//const MONGO_URL = config.urlMongo;
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.urlMongo,
      //mongoOptions --> opciones de confi para el save de las sessions
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 10 * 60,
    }),

    secret: config.privatekey,
    resave: false, // guarda en memoria
    saveUninitialized: true, //lo guarda a penas se crea
  })
);

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

//Configuración de CORS
const corsOptions = {
  // Permitir solo solicitudes desde un cliente específico
  origin: ['http://127.0.0.1:5501', 'http://localhost:5173'],
  //origin: 'http://localhost:5173',  //Util para react con vite

  // Configura los métodos HTTP permitidos
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

  // Configura las cabeceras permitidas
  allowedHeaders: 'Content-Type,Authorization',

  // Configura si se permiten cookies en las solicitudes
  credentials: true,
};
app.use(cors(corsOptions));

//Configuración de Passport y middleware adicionales
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Configuración del motor de vistas Handlebars:
//Inicializndo el motor
app.engine(
  'hbs',
  handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
const usersRouter = new UsersdRouter();
app.use('/api/users', usersRouter.getRouter());
const emailRouter = new EmailRouter();
app.use('/api/email', emailRouter.getRouter());
app.use('/api/sms', smsRouter);
const passwordRouter = new PasswwordRouter();
app.use('/api/password', passwordRouter.getRouter());

//Configuración de rutas:
const viewsRouter = new ViewsRouter();
app.use('/', viewsRouter.getRouter());

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
