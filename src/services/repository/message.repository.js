export default class MessageRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getAll = () => {
        return this.dao.getAll();
    }
    findById = (id)=> {
        return this.dao.findById(id);
    }
    createMessage = (user) => {
        return this.dao.save(message);
    }

    update = (id, message) => {
        return this.dao.update(id, message);
    }
    findByUsername = async (username) => {
        return this.dao.findByUsername(username);
    };
};