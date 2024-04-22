export default class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getAll = () => {
        return this.dao.getAll();
    }
    findById = (id)=> {
        return this.dao.findById(id);
    }
    save = (product) => {
        return this.dao.save(product);
    }

    update = (id, product) => {
        return this.dao.update(id, product);
    }
    findByUsername = async (username) => {
        return this.dao.findByUsername(username);
    };
    deleteProduct = async(id)=>{
        return this.dao.deleteProduct(id);

    }
};