'use strict';

const _ = require('underscore');

module.exports = class Room {
    constructor(name, type) {
        this.type = type;
        this.name = name;
        this.users = [];
    }

    static get type() { return { channel: 'channel', direct: 'direct' }; }
 
    add(user) {
        if (this.type === Room.type.direct && this.users.length === 2) {
            throw new Error('A direct room can only have 2 users');
        }
        this.users.push(user);
    }

    getUsers() {
        return this.users;
    }

    removeUser(user) {
        const uIndex = _.findIndex(this.users, currUser => currUser.username === user.username);

        if (uIndex !== -1) {
            this.users.splice(uIndex, 1);
        }
    }
};