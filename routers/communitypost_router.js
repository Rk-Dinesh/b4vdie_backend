const express = require('express');
const communitypostrouter = require('express').Router();
const multer = require('multer');
const path = require("path");
const fs = require('fs')

const storage = multer.diskStorage({
    destination: 'community',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const deleteFileOnError = (err, req, res, next) => {
    if (req.file && req.file.path) {
        fs.unlink(req.file.path, (unlinkErr) => {
            if (unlinkErr) {
                console.error(`Error deleting file: ${unlinkErr.message}`);
            }
        });
    }
    next(err);
};

const community = multer({ storage: storage }).single('image');

const CommunityController = require('../controller/community_controller');

communitypostrouter.post('/uploadcommunity', community, CommunityController.community);
communitypostrouter.delete('/deletecommunity', CommunityController.delete);
communitypostrouter.get('/getcommunityId', CommunityController.get);
communitypostrouter.get('/getcommunity', CommunityController.getcommunity);
communitypostrouter.get('/getonecommunitypost', CommunityController.getOneCommunityPost);
communitypostrouter.post('/likecommunity/:community_id',CommunityController.like);
communitypostrouter.post('/unlikecommunity/:community_id',CommunityController.unlike);
communitypostrouter.get('/post/:loggedInUserId', CommunityController.getfollowersDetails);

communitypostrouter.use(deleteFileOnError);

module.exports = communitypostrouter;