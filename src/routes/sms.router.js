// email.router.js
import { Router } from 'express';
import { sendSMS } from '../controllers/sms.controller.js';
/* import {
  sendEmail,
  sendEmailWithAttachments,
  sendRegistrationEmail,
} from '../../controllers/email.controller.js'; */

const router = Router();

router.get('/', sendSMS);

export default router;
