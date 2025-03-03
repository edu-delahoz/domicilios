const EstablishmentService = require("../../application/services/EstablishmentService");


class EstablishmentController{

    async create(req, res){
        try{
            const establishment = await EstablishmentService.createEstablishment(req.body);
            return res.status(201).json(establishment);
        }catch (error){
            return res.status(500).json({ message: "Error creating establishment", error: error.message });
        }
    }
    async getById(req, res){
        try{
            const establishment = await EstablishmentService.getEstablishmentById(req.params.id);
            if (!establishment){
                return res.status(404).json({ message: "Establishment not found" });
            }
            return res.json(establishment);
        } catch (error){
            return res.status(500).json({ message: "Error getting establishment", error: error.message });
        }
    }
    async getAll(req, res){
        try{
            const establishment = await EstablishmentService.getAllEstablishments();
            return res.json(establishment);
        } catch (error){
            return res.status(500).json({ message: "Error getting establishments", error: error.message });
        }
    }
    async update(req, res){
        try{
            const updatedEstablishment = await EstablishmentService.updateEstablishment(req.params.id, req.body);
            if (!updatedEstablishment){
                return res.status(404).json({ message: "Establishment not found" });
            }
            return res.json(updatedEstablishment);
        } catch (error){
            return res.status(500).json({ message: "Error updating the establishment", error: error.message });
        }
    }
    async delete(req, res) {
        try {
          const deleted = await EstablishmentService.deleteEstablishment(req.params.id);
          if (!deleted) {
            return res.status(404).json({ message: "Establecimiento no encontrado" });
          }
          return res.status(204).send();
        } catch (error) {
          return res.status(500).json({ message: "Error al eliminar el establecimiento", error: error.message });
        }
    }
}

module.exports = new EstablishmentController();
