const {expect} = require('chai');
const Chat = require('../Chat');
const User = require('../User');
const Room = require('../Room');
const {Socket} = require('net');

describe('chat', function () {
    describe('when a new chat is created', function () {
        let chat;

        before(function () {
            chat = new Chat();    
        });

        it('should have only one default channel', function () {
            expect(chat.rooms).to.have.length(1);
        });

        it('default channel should have name \'general\'', function () {
            const room = chat.rooms[0];
            expect(room.name).to.be.equal('general');
        });

        it('default channel should have type \'channel\'', function () {
            const room = chat.rooms[0];
            expect(room.type).to.be.equal(Room.type.channel);
        });

        describe('when a new user enter the chat', function () {
            let newUser;

            before(function () {
                newUser = new User(new Socket());
                chat.enter(newUser);
            });
    
            it('the user must be put in channel \'general\'', function () {
                const usersInGeneral = chat.findRoom('general').users;
                expect(usersInGeneral).to.include(newUser);
            });

            it('the user should be add in chat.users', function () {
                expect(chat.users).to.include(newUser);
            });
        });
    });
    
});