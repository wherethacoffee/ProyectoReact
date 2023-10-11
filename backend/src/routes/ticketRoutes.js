const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.get('/listar', ticketController.list);
router.get('/add', ticketController.save);
router.get('/edit/:id', ticketController.update);
router.get('/delete/:id', ticketController.delete);

module.exports = router;