import { v4 } from 'uuid';
import nodemailer from 'nodemailer';

import { passwordResetService, userService } from '../services/service.js';
import config from '../config/config.js';
import { isValidPassword, createHash } from '../helpers/utils.js';

//import ProductDTO from "../services/dto/product.dto.js";

// configurar el transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: config.gmailAccount,
    pass: config.gmailAppPassword,
  },
});

/* console.log(config.gmailAccount);
  console.log(config.gmailAppPassword); */

// verificar conexxion
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

//mail optios to password reset
const mailOptionsPasswordReset = {
  from: 'email test - ' + config.gmailAccount,
  subject: 'Reset Password',
};

export const sendMailPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    //Verificar si existe un registro en la coleccion password_reset

    if (!email) {
      return res.status(400).send({ message: 'Email must be provided' });
    }
    //Verificar que exista el usuario en la coleccion users
    const userToReset = await userService.findByUsername(email);
    if (!userToReset) {
      throw new Error('There is no user with the requested email');
    }
    /*
    email: { type: String, index: true },
    token: String,
    expirationTime: { type: Date, default: Date.now }
    */
    const token = v4();
    const newResetentry = {
      email: email,
      token: token,
      expirationTime: new Date(Date.now() + 60 * 60 * 1000),
    };

    const result = await passwordResetService.save(newResetentry);
    if (!result) {
      throw new Error('Could not generate a token');
    }
    const link = `http://localhost:${config.port}/passwordreset/${token}`;
    mailOptionsPasswordReset.to = email;
    mailOptionsPasswordReset.html = `
          <div>
              <h1> This link will allow you to reset your password, it is valid for 60 minutes</h1>
              <br />
              <a href="${link}"> Password Reset</a> 
  
          </div>`;
    let sendResult = transporter.sendMail(
      mailOptionsPasswordReset,
      (error, info) => {
        if (error) {
          console.log(error);
          res.status(400).send({ message: 'Error', payload: error });
        } else {
          console.log('It has been sent successfully: %s', info.messageId);
          console.log(info);
          res.status(200).send({ message: 'Success', payload: info });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: error.message,
      message: 'Could not send password reset email.',
    });
  }
};

export const storeNewPassword = async (req, res) => {
  try {
    const { token, password, confirmpassword } = req.body;
    //Verificar que se reciban los parametros necesario
    if (!token || !password || !confirmpassword) {
      throw new Error('missing token, password or password confirmation');
    }
    //verifica si las clavescoinciden
    if (password !== confirmpassword)
      throw new Error('the password and the confirmation are different');

    //Verificar que el token sea valido
    const dataToken = await passwordResetService.findByToken(token);
    if (!dataToken) throw new Error('the token is invalid');

    //Verificar que no este vencido
    const now = new Date();
    if (now > dataToken.expirationTime) {
      throw new Error('the token is expired');
      //return res.status(302).redirect('/linkpasswordreset')
    }
    //Verificar que no sea la misma clave existente
    const user = await userService.findByUsername(dataToken.email);
    if (!user) throw new Error('Username does not exist');
    if (isValidPassword(user, password))
      throw new Error('The password entered is the current one');

    //Proceder a actualizar el password
    user.password = createHash(password);
    const result = await userService.save(user);

    res.status(200).send(result);
  } catch (error) {
    if (error.message === 'the token is expired') {
      //res.status(302).redirect('/linkpasswordreset');
      res.status(302).send({
        error: error.message,
        message: 'I cannot reassign the password.',
      });
    } else {
      res.status(500).send({
        error: error.message,
        message: 'I cannot reassign the password.',
      });
    }

    //console.error(error.message);
  }
};
