const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter')
const clientRouter = require('./clientRouter')
const managerRouter = require('./managerRouter')
const requestRouter = require('./requestRouter')

router.use('/user', userRouter);
router.use('/client', clientRouter);
router.use('/manager', managerRouter);
router.use('/request', requestRouter);

module.exports = router;