const ChatServer = require('./ChatServer');
const Chat = require('./Chat');

const chat = new Chat();
const server = new ChatServer(chat);;