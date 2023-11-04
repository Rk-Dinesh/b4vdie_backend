const router = require('express').Router();
const userController = require('../controller/user_controller');
const idcodeController = require('../controller/idcode_controller');
const tripController = require('../controller/trip_controller');
const transportController = require('../controller/transport_controller');


router.post('/idcode', idcodeController.idcode);

router.post('/registration', userController.register);
router.post('/login', userController.login);
router.get('/getuser',userController.get)
router.put('/update', userController.Update);
router.delete('/delete',userController.delete);

router.post('/createtrip',tripController.trip );
router.get ('/gettrip',tripController.get);
router.put('/updatetrip',tripController.update);
router.delete('/deletetrip', tripController.delete);

router.post('/createtransport',transportController.transport)


module.exports = router;