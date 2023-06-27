const Router = require('express');
const router = new Router();
const clientController = require('../controllers/clientController')

router.post('/', clientController.create)
router.get('/', clientController.getAll)
router.get('/:id', clientController.getOne)
router.delete('/', clientController.delete)

module.exports = router;