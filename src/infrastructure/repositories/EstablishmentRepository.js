const Establishment = require("../../domain/models/Establishment");

class EstablishmentRepository {

    async create(data){
        return await Establishment.create(data);
    }
    
    async findById(id){
        return await Establishment.findByPk(id);
    }
    async findAll(){
        return await Establishment.findAll();
    }
    async update(id, data){
        const establishment = await Establishment.findByPk(id);
        if (!establishment) return null;
        return await establishment.update(data);
    }
    async delete(id){
        const establishment = await Establishment.findByPk(id);
        if (!establishment) return null;
        await establishment.destroy();
        return true;
    }
}

module.exports = new EstablishmentRepository();