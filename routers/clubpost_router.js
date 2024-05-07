const express = require('express');
const clubpostrouter = require('express').Router();
const multer = require('multer');
const path = require("path");

const ClubPostController = require('../controller/clubpost_controller')

const storage = multer.diskStorage({
    destination: 'img',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const clubpost = multer({ storage: storage }).single('clubpostimage');

clubpostrouter.post('/clubpost',clubpost, ClubPostController.createpost);
clubpostrouter.delete('/deleteclubpost', ClubPostController.delete);
clubpostrouter.delete('/deleteclubpostid', ClubPostController.deleteid);
clubpostrouter.get('/getclubpostId', ClubPostController.getPost);
clubpostrouter.get('/getonepost', ClubPostController.getOnePost);
clubpostrouter.post('/like/:clubpost_id',ClubPostController.like);
clubpostrouter.post('/unlike/:clubpost_id',ClubPostController.unlike);
clubpostrouter.post('/comment/:clubpost_id',ClubPostController.addComment);

module.exports = clubpostrouter;