const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter')
const clientRouter = require('./clientRouter')
const managerRouter = require('./managerRouter')

router.use('/user', userRouter);
router.use('/client', clientRouter);
router.use('/manager', managerRouter);

module.exports = router;