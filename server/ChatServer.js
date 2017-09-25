'use strict';

const {Server, Socket} = require('net');
const User = require('./User');

module.exports = class ChatServer extends Server {
    constructor(chat) {
        super();

        if (!chat) {
            throw new TypeError('you should pass a chat as argument');
        }

        this.chat = chat;

        this.on('connection', (socket) => {
            const address = socket.address();
            this.chat.enter(new User(socket));
            console.log(`new socket connected from address ${address.address}:${address.port}`);
        });

        this.listen(process.env.PORT || 3333);

        this.on('listening', () => {
            const address = this.address();
            console.log(`server listening on ${address.address}:${address.port}`)
        });
    }
};