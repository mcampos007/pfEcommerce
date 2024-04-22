//import { Router } from "express";
import CustomRouter from './custom/custom.router.js';
//import { validateProduct } from '../../utils/validateProduct.js';
import {
  sendMailPasswordReset,
  storeNewPassword,
} from '../controllers/passwordreset.controller.js';
//import errorHandler from '../../services/errors/middlewares/index.js';

//import __dirname from "../../utils.js";

///const router = Router();

export default class PasswwordExtendRouter extends CustomRouter {
  init() {
    //Recuperar todos los productos
    //this.get('/', ['PUBLIC'], getAll);
    this.post('/reset', ['PUBLIC'], sendMailPasswordReset);
    this.post('/update', ['PUBLIC'], storeNewPassword);
  }
}
