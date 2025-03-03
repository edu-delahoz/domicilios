const EstablishmentRepository = require("../../infrastructure/repositories/EstablishmentRepository");


class EstablishmentService{

    async createEstablishment(data){
        return await EstablishmentRepository.create(data);
    }
    async getEstablishmentById(id){
        return await EstablishmentRepository.findById(id);
    }
    async getAllEstablishments(){
        return await EstablishmentRepository.findAll();
    }
    async updateEstablishment(id ,data){
        return await EstablishmentRepository.update(id, data);
    }
    async deleteEstablishment(id){
        return await EstablishmentRepository.delete(id);
    }
}
module.exports = new EstablishmentService();
