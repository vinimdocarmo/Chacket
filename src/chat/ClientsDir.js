'use strict';

module.exports = class ClientsDir {
    constructor() {
        this.clients = [];
    }

    addClient(client) {
        this.clients.push(client);
    }
};