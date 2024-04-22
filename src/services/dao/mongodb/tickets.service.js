import ticketModel from '../models/ticket.model.js';
import mongoose, { Mongoose, Types } from 'mongoose';

export default class TicketDao {
  constructor() {
    // console.log("Calling Ticket model a servise");
  }

  getAll = async () => {
    let tickets = await ticketModel.find();
    return tickets;
  };

  save = async (ticket) => {
    let result = await ticketModel.create(ticket);
    return result;
  };

  deleteTicket = async (id) => {
    let result = await ticketModel.findByIdAndDelete(id);
    return result;
  };

  updateTicket = async (id, ticket) => {
    const result = await ticketModel.updateOne({ _id: id }, ticket);
    return result;
  };

  findById = async (id) => {
    const result = await ticketModel.findById(id);
    return result;
  };
}
