const router = require('express').Router();
const userController = require('../controller/user_controller');
const idcodeController = require('../controller/idcode_controller');
const tripController = require('../controller/trip_controller')


router.post('/registration', userController.register);
router.post('/login', userController.login);
router.put('/update', userController.Update);
router.delete('/delete',userController.delete);
router.post('/idcode', idcodeController.idcode);
router.post('/createtrip',tripController.trip );


module.exports = router;