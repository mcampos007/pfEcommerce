export default class PasswordResetRespository {
    constructor(dao){
        this.dao = dao
    }

    findByEmail = (email)=>{
        return this.dao.findByEmail(email)
    }


}