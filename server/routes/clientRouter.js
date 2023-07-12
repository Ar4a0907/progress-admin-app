const Router = require('express');
const router = new Router();
const clientController = require('../controllers/clientController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN') ,clientController.create)
router.get('/', clientController.getAll)
router.get('/:id', clientController.getOne)
router.delete('/', clientController.delete)

module.exports = router;