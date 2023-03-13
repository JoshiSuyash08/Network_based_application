const express = require('express');
const router = express.Router();
const controller = require('../controllers/tradeController');


//GET /trades: send all trades to the user
router.get('/', controller.index);

//GET /trades/new: send html form for creating a new trade
router.get('/new', controller.new);

//POST /trades: create a new trade
router.post('/', controller.create);

//GET /trades/:id: send details of trade identified by id
router.get('/:id', controller.show);

//GET /trades/:id: send html form for editing an existing trade
router.get('/:id/edit', controller.edit);

//PUT /trades/:id: update the trade identified by id
router.put('/:id', controller.update);

//DELETE /trades/:id: delete the trade identified by id
router.delete('/:id', controller.delete);

module.exports=router;  