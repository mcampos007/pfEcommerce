import __dirname from './utils.js';
import path from 'path';
import winston from 'winston';
//import { createLogger, format, transports } from 'winston';
import config from '../config/config.js';

const logsDirectory = path.join(__dirname, '/logs');

const logFileGeneral = path.join(logsDirectory, 'general.log');
const logFileError = path.join(logsDirectory, 'error.log');
/* console.log("modo")
console.log(config.environment) */

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'red',
    error: 'orange',
    warning: 'yellow',
    info: 'green',
    http: 'white',
    debug: 'blue',
  },
};

winston.addColors(customLevelsOptions.colors);

const logger = winston.createLogger({
  levels: customLevelsOptions.levels,
  format: winston.format.combine(
    winston.format.colorize({ colors: customLevelsOptions.colors }),
    winston.format.simple()
  ),

  //  colorize:true,
  // defaultMeta: { service: 'your-service-name' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `quick-start-combined.log`.
    // - Write all logs error (and below) to `quick-start-error.log`.
    //{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
    new winston.transports.File({
      filename: logFileGeneral,
      level: 'debug',
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: logFileError, level: 'error' }),
    //new transports.File({ filename:logFileGeneral, level: 'error'  })
  ],
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
// console.log(config.environment);
if (config.environment === 'prod' || config.environment === 'prod') {
  // console.log('Habilitado en console');
  logger.add(
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    })
  );
}

export const addLogger = (req, res, next) => {
  req.logger = logger;

  //console.log(req.logger)
  /*  req.logger.warn(
    `${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${
      new Date().toLocaleTimeString()
    }`
  );
  */
  req.logger.info(
    `${req.method} en ${
      req.url
    } - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
  );
  next();
};

//format: winston.format.simple()
