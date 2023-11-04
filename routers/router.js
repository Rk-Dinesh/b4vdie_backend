const router = require('express').Router();
const userController = require('../controller/user_controller');
const idcodeController = require('../controller/idcode_controller');
const tripController = require('../controller/trip_controller');
const transportController = require('../controller/transport_controller');
const pitstopController = require('../controller/pitstop_controller');
const tripalertController = require('../controller/tripalert_controller');
const cotravellerController = require('../controller/cotraveller_controller');

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

router.post('/createtransport',transportController.transport);
router.get('/gettransport',transportController.get);
router.put('/updatetransport',transportController.update);
router.delete('/deletetransport',transportController.delete);

router.post('/createpitstop',pitstopController.pitstop);
router.get('/getpitstop',pitstopController.get);
router.put('/updatepitstop',pitstopController.Update);
router.delete('/deletepitstop',pitstopController.delete);

router.post('/createalert',tripalertController.TripAlerts);
router.get('/getalert',tripalertController.get);
router.put('/updatealert',tripalertController.Update);
router.delete('/deletealert',tripalertController.delete);

router.post('/createtraveller',cotravellerController.Cotraveller);
router.get('/gettraveller',cotravellerController.get);
router.put('/updatetraveller',cotravellerController.Update);
router.delete('/deletetraveller',cotravellerController.delete);


module.exports = router;