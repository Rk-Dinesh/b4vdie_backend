const ChatModel = require("../model/chat_model");

class ChatServices {

    static async createChat(email,msg,sender,username){
        try {
          
            const newChat = new ChatModel({email,msg,sender,username});
            return await newChat.save();
        } catch (error) {
            throw error;
        }
    }

  

    static async getChat1(email){
       
        return await ChatModel.find({email});
    }

    static async getChat(){
        try {
            return await ChatModel.find();
        } catch (error) {
            throw error
        }
    }
};
module.exports = ChatServices;
