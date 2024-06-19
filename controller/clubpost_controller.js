const ClubPostServices = require('../services/clubpost_services');
const fs = require('fs');
const path = require("path");


exports.createpost = async (req, res, next) => {
    try {
        const { club_id, clubpost_id, userid, like,des ,date,reporters,report} = req.body;
        const {filename} = req.file;

        const Res = await ClubPostServices.registerClubPost(club_id, userid, like,des,date,reporters,report,filename);
        let Post = { club_id, clubpost_id, userid, like, des,date,reporters,report, clubpostimage : req.file.filename };
        res.status(200).json(Post)

    } catch (error) {
        next(error)
    }
}

exports.like = async (req, res,next) => {
    const { userid } = req.body;
    const { clubpost_id } = req.params;

    try {
        const result = await ClubPostServices.like(clubpost_id, userid);

        if (!result.success) {
            return res.status(result.success ? 200 : 400).json({ message: result.message });
        }
        return res.status(200).json(result);
    } catch (err) {
        next(err)
    }
};


exports.unlike = async (req, res, next) => {

    const { userid } = req.body;
    const { clubpost_id } = req.params;

    try {
        const result = await ClubPostServices.unlike(clubpost_id, userid);

        if (!result.success) {
            return res.status(result.success ? 200 : 400).json({ message: result.message });
        }
        return res.status(200).json(result);
    } catch (err) {
        next(err)
    }
};

exports.addComment = async (req, res) => {
    const { userid, comment } = req.body;
    const { clubpost_id } = req.params;

    try {
        const result = await ClubPostServices.comment(clubpost_id, userid, comment);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { clubpost_id } = req.query;
        const post = await ClubPostServices.clubpost_id(clubpost_id);

        if (post && post.clubpostimage) {
            const filePath = path.join(__dirname, '../clubpost', post.clubpostimage);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Error deleting file: ${err.message}`);
                }
            });
        }

        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
}


exports.deleteid = async (req, res, next) => {
    try {
        const { club_id } = req.query;
        const post = await ClubPostServices.club_id(club_id);

        if (post && post.clubpostimage) {
            const filePath = path.join(__dirname, '../clubpost', post.clubpostimage);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Error deleting file: ${err.message}`);
                }
            });
        }
        
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
}

exports.getPost = async (req, res, next) => {
    try {
        const { club_id } = req.query;
        const User = await ClubPostServices.get(club_id);
        res.status(200).json({token : User})
    } catch (error) {
        next(error);
    }
}

exports.getOnePost = async (req, res, next) => {
    try {
        const { clubpost_id} = req.query;
        const User = await ClubPostServices.getOnePost(clubpost_id);
        res.status(200).json({token : User})
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res,next) => {
    const { userid,reporters } = req.body;
    const { clubpost_id } = req.params;

    try {
        const result = await ClubPostServices.report(clubpost_id, userid, reporters); // use report method instead

        if (!result.success) {
            return res.status(result.success ? 200 : 400).json({ message: result.message });
        }
        return res.status(200).json(result);
    } catch (err) {
        next(err)
    }
};