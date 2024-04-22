import CustomRouter from './custom/custom.router.js';
// email.router.js
import { Router } from 'express';
import {
  sendEmail,
  sendEmailWithAttachments,
  sendRegistrationEmail,
} from '../controllers/email.controller.js';

export default class EmailExtendRouter extends CustomRouter {
  init() {
    //Test
    this.get('/', ['ADMIN'], sendEmail);
    // Test with attach
    this.get(
      '/attachments',
      ['ADMIN', 'USER', 'PREMIUM'],
      sendEmailWithAttachments
    );
    //Sending registration email
    this.get('/registro', ['ADMIN', 'USER', 'PREMIUM'], sendRegistrationEmail);
  }
}
