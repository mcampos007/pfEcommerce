// socketManager.js
import { Server } from 'socket.io';
import messagesDao from '../services/dao/mongodb/messages.dao.js';

const initSocket = (server) => {
  const io = new Server(server);
  let messages = [];

  io.on('connection', (socket) => {
    // console.log('Nuevo cliente Conectado');
    // Socket de inicio de sesión
    socket.on('inicio', async (data) => {
      // console.log(`Bienvenido ${data}`);
      const objMsg = {
        correoDelUsuario: data,
        message: 'Starting session',
      };

      try {
        const statmsg = await messagesDao.createMessage(objMsg);
        // console.log(`Registro en la colección: ${statmsg}`);
        // Recuperar todos los mensajes registrados
        const allmsg = await messagesDao.getAllMessages();
        // console.log(`Mensajes recuperados: ${allmsg}`);
        const resultados = allmsg.map(({ correoDelUsuario, message }) => ({
          correoDelUsuario,
          message,
        }));
        // console.log(resultados);
        // Envío los mensajes grabados
        socket.emit('messageLogs', resultados);
        // Aviso en broadcast el inicio
        socket.broadcast.emit('connection', data);
      } catch (error) {
        // console.error('Error:', error);
        socket.emit('error', { message: 'Hubo un error en el servidor.' });
      }
    });

    // Recibir lo que se escriba en la caja de texto
    socket.on('message', async (data) => {
      try {
        // console.log(`Datos recibidos en el socket message: ${data}`);
        messages.push(data);
        io.emit('messageLogs', messages);
        // Crear mensaje en la colección
        const msg = await messagesDao.createMessage(data);
        // console.log(`Mensaje registrado en la colección: ${data}`);
      } catch (error) {
        // console.error('Error:', error);
        socket.emit('error', { message: 'Hubo un error en el servidor.' });
      }
    });
  });
};

export default initSocket;
