import { messageModel } from '../models/messages.model.js';
import mongoose from 'mongoose';

export default class MessageDao {
  constructor() {
    console.log('Calling message model a service');
  }
  async getAllMessages() {
    return await messageModel.find();
  }

  async getMessageById(id) {
    return await messageModel.findById(id);
  }

  async createMessage(message) {
    console.log(message);
    return await messageModel.create(message);
  }

  async updateMessage(id, newMessage) {
    return await messageModel.findByIdAndUpdate(id, newMessage);
  }

  async deleteMessage(id) {
    return await messageModel.findByIdAndDelete(id);
  }
}
