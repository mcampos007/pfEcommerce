export default class TicketsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAll = () => {
        return this.dao.getAll();
    }

    save = (ticket) => {
        return this.dao.save(ticket);
    }

    deleteTicket = async(cid) =>{
        return this.dao.deleteCart(cid);
    }

    updateTicket = (id, ticket) =>{

    }

    findById = (id)=> {
        return this.dao.findById(id);
    }
};