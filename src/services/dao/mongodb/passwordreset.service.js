import passwordResetModel from '../models/password_reset.js';
//import mongoose from 'mongoose';
export default class PasswordResetDao {
  constructor() {
    console.log('Calling password model a servise');
  }
  async findByEmail(email) {
    try {
      const userResetPassword = await passwordResetModel.findOne({
        email: email,
      });
      return userResetPassword;
    } catch (error) {
      return error;
    }
  }

  async findByToken(token) {
    try {
      const result = await passwordResetModel.findOne({ token: token });
      return result;
    } catch (error) {
      return error;
    }
  }

  async save(user) {
    try {
      const result = await passwordResetModel.create(user);
      return result;
    } catch (error) {
      return error;
    }
  }
}
