import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program
  .option('-d', 'Varaible para debug', false) //primero va la variable, luego la descripcion y al final puede ir un valor por defecto.
  .option('-p <port>', 'Puerto del servidor', 9090)
  .option('--persist <persist>', 'Modo de persistencia', 'mongodb')
  .option('--mode <mode>', 'Modo de trabajo', 'develop')
  .requiredOption(
    '-u <user>',
    'Usuario que va a utilizar el aplicativo.',
    'No se ha declarado un usuario.'
  ); //RequireOption usa un mensaje por defecto si no está presente la opción.
program.parse(); //Parsea los comandos y valida si son correctos.

const environment = program.opts().mode;
let filesetting = '';
console.log(`Env: ${environment}`);

switch (environment) {
  case 'prod':
    filesetting = './src/config/.env.production';
    break;
  case 'dev':
    filesetting = './src/config/.env.development';
    break;
  case 'local':
    filesetting = './src/config/.env.local';
    break;
  case 'test':
    filesetting = './src/config/.env.test';
    break;
  default:
    filesetting = './src/config/.env.development';
}

dotenv.config({
  path: filesetting,
});

//console.log(process.env.PORT);

export default {
  port: process.env.PORT,
  urlMongo: process.env.MONGO_URL,
  privatekey: process.env.PRIVATE_KEY,
  adminName: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  persistence: program.opts().persist,
  gmailAccount: process.env.GMAIL_ACCOUNT,
  gmailAppPassword: process.env.GMAIL_APP_PASSWD,
  twilioAccountSID: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioSmsNumber: process.env.TWILIO_SMS_NUMBER,
  twilioToSmsNumber: process.env.TWILIO_TO_SMS_NUMBER,
  environment: environment,
};
