const express = require("express");
const router = express.Router();
const EstablishmentController = require("../infrastructure/controllers/EstablishmentController");

router.post('/', EstablishmentController.create);

router.get('/', EstablishmentController.getAll);

router.get('/:id', EstablishmentController.getById);

router.put('/:id', EstablishmentController.update);

router.delete('/:id', EstablishmentController.delete);

module.exports = router;


