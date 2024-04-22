export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getAll = () => {
        return this.dao.getAll();
    }
    findById = (id)=> {
        return this.dao.findById(id);
    }
    save = (user) => {
        return this.dao.save(user);
    }

    update = (id, user) => {
        return this.dao.update(id, user);
    }
    findByUsername = async (username) => {
        return this.dao.findByUsername(username);
    };
};