var express = require('express');
var router = express.Router();
const productsController = require("../controllers/productsController")

/* GET users listing. */
router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

//crear
router.post('/', (req,res,next)=>req.app.verifyToken(req,res,next), productsController.create);

//actualizar
router.put('/:id', productsController.update);

//delete
router.delete('/:id', productsController.delete);


module.exports = router;
