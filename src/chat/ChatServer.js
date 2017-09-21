'use strict';

const {Server} = require('net');

module.exports = class ChatServer extends Server {
    constructor(clientsHandler) {
        super();

        if (!clientsHandler) {
            throw new TypeError('you should pass a clients handler');
        }

        this.clientsHandler = clientsHandler;

        this.on('connection', (client) => {
            this.clientsHandler.addClient(client);
        });
    }
};