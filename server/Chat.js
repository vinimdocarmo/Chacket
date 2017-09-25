'use strict';
const Room = require('./Room');
const _ = require('underscore');

module.exports = class Chat {
    constructor() {
        this.rooms = [];
        this.users = [];
        this.rooms.push(new Room('general', Room.type.channel));
    }

    enter(user) {
        this.users.push(user);
        this.findRoom('general').add(user);

        user.socket.on('data', this.handleMessage.bind(this, user));
    }

    findRoom(roomName) {
        return _.findWhere(this.rooms, room => room.name === roomName);
    }

    addUser(user) {
        this.users.push(user);
    }

    handleMessage(user, data) {
        const message = JSON.parse(data);
        
        this.findRoom(message.room).users.forEach(function (currUser) {
            if (currUser !== user) {
                currUser.socket.write(data);
            }
        });
    }
};