const express = require('express');
const chatrouter = require('express').Router();

const ChatController = require('../controller/chat_controller')

chatrouter.post('/chat',ChatController.Chat);
chatrouter.get('/chatget',ChatController.get);
chatrouter.get('/chatall',ChatController.getChat);


module.exports = chatrouter;