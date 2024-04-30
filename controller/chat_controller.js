const ChatServices = require("../services/chat_service");


exports.Chat = async(req,res,next) => {
    try {
        const{email,msg,sender,username} = req.body;

        const Data = await ChatServices.createChat(email,msg,sender,username);

       
        res.status(200).json(Data)

    } catch (error) {
        throw error;
    }

}




exports.get = async (req,res,next) => {
    try {
        const {email} = req.query;
        const getData = await ChatServices.getChat1(email);
        res.status(200).json(getData)
    } catch (error) {
        next(error);
    }
}

exports.getChat = async(req,res,next) =>{
    try {
        const Admin = await ChatServices.getChat();
        res.status(200).json(Admin)
    } catch (error) {
        next(error);
    }
}