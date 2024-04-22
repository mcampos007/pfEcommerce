import ProductServiceDao from './dao/mongodb/products.service.js';
import CartServiceDao from './dao/mongodb/carts.service.js';
import UserServiceDao from './dao/mongodb/users.service.js';
import TicketServiceDao from './dao/mongodb/tickets.service.js';
import MessageServiceDao from './dao/mongodb/messages.service.js';
import PasswordResetServiceDao from './dao/mongodb/passwordreset.service.js';

import ProductsRepository from './repository/product.repository.js';
import CartsRepository from './repository/cart.repository.js';
import UserRepository from './repository/user.repository.js';
import TicketRepository from './repository/ticket.repository.js';
import MessageRepository from './repository/message.repository.js';
import PasswordResetRespository from './repository/passwordreset.repository.js';

// Generamos las instancias de las clases
const productDao = new ProductServiceDao();
const cartDao = new CartServiceDao();
const userDao = new UserServiceDao();
const ticketDao = new TicketServiceDao();
const messageDao = new MessageServiceDao();
const passwordResetDao = new PasswordResetServiceDao();

export const productService = new ProductsRepository(productDao);
export const cartService = new CartsRepository(cartDao);
export const userService = new UserServiceDao(userDao);
export const ticketService = new TicketServiceDao(ticketDao);
export const messageService = new MessageServiceDao(messageDao);
export const passwordResetService = new PasswordResetServiceDao(
  passwordResetDao
);
