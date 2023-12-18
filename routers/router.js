const express = require('express');
const router = require('express').Router();
const multer = require('multer');
const path = require("path");

const userController = require('../controller/user_controller');
const idcodeController = require('../controller/idcode_controller');
const tripController = require('../controller/trip_controller');
const transportController = require('../controller/transport_controller');
const pitstopController = require('../controller/pitstop_controller');
const tripalertController = require('../controller/tripalert_controller');
const cotravellerController = require('../controller/cotraveller_controller');
const AdminController = require('../controller/admin_controller');
const ImageController = require('../controller/image_controller');
const CommunityController = require('../controller/community_controller');
const ClubController = require('../controller/club_controller');
const ClubPostController = require('../controller/clubpost_controller')

const storage = multer.diskStorage({
    destination: 'img',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage }).single('Profile');
const community = multer({ storage: storage }).single('image');
const user = multer({ storage: storage }).fields([
    { name: 'userimage', maxCount: 1 },
    { name: 'coverimage', maxCount: 1 },
]);
const club = multer({ storage: storage }).fields([
    { name: 'clubimage', maxCount: 1 },
    { name: 'clubcover', maxCount: 1 },
]);
const clubpost = multer({ storage: storage }).single('clubpostimage');

router.post('/upload', upload, ImageController.image);
router.post('/updateimage', upload, ImageController.update);
router.delete('/deleteimage', ImageController.delete);
router.get('/getimageId', ImageController.get);
router.get('/getimage', ImageController.getimage);


router.post('/idcode', idcodeController.idcode);

router.post('/admin', AdminController.register);
router.post('/adminlogin', AdminController.login);
router.get('/getadmin', AdminController.get)
router.get('/getadmin1', AdminController.getAdmin);
router.get('/getemail', AdminController.getEmail);
router.put('/updateadmin', AdminController.Update);
router.delete('/deleteadmin', AdminController.delete);

router.post('/registration',user, userController.register);
router.post('/login', userController.login);
router.get('/getuser', userController.get)
router.get('/get', userController.getUser)
router.get('/getUserId', userController.getUserId);
router.put('/update', userController.Update);
router.put('/updateimageuser', user,userController.updateImage );
router.put('/updatecoveruser', user,userController.updatecover);
router.post('/follow/:followedUserId',userController.follow)
router.post('/unfollow/:followedUserId',userController.unfollow)
router.post('/interst/:userid',userController.addInterest);
router.delete('/delete', userController.delete);
router.get('/followers/:loggedInUserId', userController.getfollowersDetails);
router.get('/following/:loggedInUserId', userController.getfollowingDetails);

router.post('/createtrip', tripController.trip);
router.get('/gettrip', tripController.get);
router.get('/trips', tripController.gettrip);
router.put('/updatetrip', tripController.update);
router.delete('/deletetrip', tripController.delete);

router.post('/createtransport', transportController.transport);
router.get('/gettransport', transportController.get);
router.put('/updatetransport', transportController.update);
router.delete('/deletetransport', transportController.delete);
router.delete('/deletealltransport', transportController.deletetransport);

router.post('/createpitstop', pitstopController.pitstop);
router.get('/getpitstop', pitstopController.get);
router.put('/updatepitstop', pitstopController.Update);
router.delete('/deletepitstop', pitstopController.delete);
router.delete('/deleteallpitstop', pitstopController.deletepitstop);

router.post('/createalert', tripalertController.TripAlerts);
router.get('/getalert', tripalertController.get);
router.put('/updatealert', tripalertController.Update);
router.delete('/deletealert', tripalertController.delete);
router.delete('/deleteallalert', tripalertController.deletealert);

router.post('/createtraveller', cotravellerController.Cotraveller);
router.get('/gettraveller', cotravellerController.get);
router.put('/updatetraveller', cotravellerController.Update);
router.delete('/deletetraveller', cotravellerController.delete);
router.delete('/deletealltraveller', cotravellerController.deletetraveller);

router.post('/uploadcommunity', community, CommunityController.community);
router.delete('/deletecommunity', CommunityController.delete);
router.get('/getcommunityId', CommunityController.get);
router.get('/getcommunity', CommunityController.getcommunity);
router.get('/getonecommunitypost', CommunityController.getOneCommunityPost);
router.post('/likecommunity/:community_id',CommunityController.like);
router.post('/unlikecommunity/:community_id',CommunityController.unlike);

router.post('/uploadclub', club, ClubController.createClub);
router.put('/updateimage', club, ClubController.updateImage);
router.put('/updatecover', club, ClubController.updatecover);
router.put('/updatename', club, ClubController.update);
router.delete('/deleteclub', ClubController.delete);
router.get('/getclubId', ClubController.get);
router.get('/getclub', ClubController.getclub);

router.post('/clubpost',clubpost, ClubPostController.createpost);
router.delete('/deleteclubpost', ClubPostController.delete);
router.get('/getclubpostId', ClubPostController.getPost);
router.get('/getonepost', ClubPostController.getOnePost);
router.post('/like/:clubpost_id',ClubPostController.like);
router.post('/unlike/:clubpost_id',ClubPostController.unlike);
router.post('/comment/:clubpost_id',ClubPostController.addComment);

module.exports = router;