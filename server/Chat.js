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

    handleMessage(user, buffer) {
        const data = JSON.parse(buffer);

        switch (data.type) {
            case 'end':
                this.onEndConnection(user, data);
                break;
            case 'start':
                this.onStartConnection(user, data);
                break;
            case 'message':
                this.broadcast(user, data);
                break;
            case 'username':
                this.user.setUsername(data.username);
        }
    }

    broadcast(user, data) {
        try {
            this.findRoom(data.room).users.forEach(function (currUser) {
                currUser.socket.write(JSON.stringify(data));
            });
        } catch(error) {
            console.error('Error tryng to broadcast a message to all users');
            console.error(error);
        }
    }

    onEndConnection(user, data) {
        this.removeUser(user);
        this.users.forEach(user => user.socket.write(JSON.stringify(data)));
    }

    removeUser(user) {
        const uIndex = _.findIndex(this.users, currUser =>  currUser.username === user.username);

        if (uIndex !== -1) {
            this.users.splice(uIndex, 1);
        }

        this.rooms.forEach(room => room.removeUser(user));

        let address = user.socket.address();
        console.log(`Socket from address ${address.address}:${address.port} has ended connection`);
    }

    onStartConnection(user, data) {
        user.setUsername(data.username);

        this.users.forEach(currUser => {
            if (user !== currUser) {
                try {
                    currUser.socket.write(JSON.stringify({ type: 'start', usernames: [data.username] }));
                } catch(error) {
                    console.error('Erro tryng do notify clients about new connection');
                    console.error(error);
                }
            }
        });

        const allUsernamesButMine = this.users.filter(currUser => currUser !== user).map(user => user.username);

        user.socket.write(JSON.stringify({ type: 'start', usernames: allUsernamesButMine }));
    }
};