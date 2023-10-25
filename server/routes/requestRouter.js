const Router = require('express');
const router = new Router();
const requestController = require('../controllers/requestController');
const checkRole = require('../middleware/checkRoleMiddleware');


router.get('/', requestController.getAllRequests);
router.get('/:id', requestController.getOneRequest);

module.exports = router;