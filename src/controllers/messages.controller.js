import {messageService} from "../services/service.js";
import MessageDTO from "../services/dto/message.dto.js";

export const getAllMessages = async(req, res) =>{
    try {
        const {limit, page, query, sort} = req.body;
        let messages = await messageService.getAllMessages(limit, page, query, sort);
        res.send(messages);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los mensajes." });
    }

}

export const createMessage = async(req, res) =>{
    try {
        console.log(req.body)
        let newChat = new MessageDTO(req.body);
        let result = await messageService.createMessage(newChat);
        if (!result) {
            // Violación de restricción única
            return res.status(400).json({ error: 'Determinar Tipo de Error' });
          } 
        res.status(201).send(result);    
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo crear el mensaje." });
    }
}
