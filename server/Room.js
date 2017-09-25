'use strict';

module.exports = class Channel {
    constructor(name, type) {
        this.type = type;
        this.name = name;
        this.users = [];
    }

    static get type() { return { channel: 'channel', direct: 'direct' }; }
 
    add(user) {
        this.users.push(user);
    }

    getUsers() {
        return this.users;
    }
};