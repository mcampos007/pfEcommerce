export default class CartsRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getAll = () => {
        return this.dao.getAll();
    }
    save = (product) => {
        return this.dao.save(product);
    }
    
    addProductToCart = async(cart, pid) =>{
        return this.dao.addProductToCart(cart, pid);
    }  
    
    deleteProductToCart = async(cart, pid) =>{
        return this.dao.deleteProductToCart(cart, pid);
    }
    deleteCart = async(cid) =>{
        return this.dao.deleteCart(cid);
    }
    
    
    findById = (id)=> {
        return this.dao.findById(id);
    }
    findByUser = (id)=> {
        return this.dao.findByUser(id);
    }

    update = (id, cart) => {
        return this.dao.update(id, cart);
    }
  
    /*update = (id, product) => {
        return this.dao.update(id, product);
    }
    findByUsername = async (username) => {
        return this.dao.findByUsername(username);
    }; */
     
    
};