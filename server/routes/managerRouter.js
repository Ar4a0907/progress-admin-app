const Router = require('express');
const router = new Router();
const managerController = require('../controllers/managerController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', managerController.create);
router.delete('/', managerController.delete);
router.get('/:id', managerController.getClientManagers);

module.exports = router;