'use strict';

const {expect} = require('chai');
const net = require('net');
const ChatServer = require('../ChatServer');
const Chat = require('../Chat');
const User = require('../User');
const sinon = require('sinon');

describe('server', function () {
    describe('when a new chat server is created', function () {
        describe('without passing a clients handler as the first argument', function () {
            it('should thrown a TypeError', function () {
                expect(() => new ChatServer()).to.throw(TypeError);
            });
        });

        describe('passing a clients handler as the first argument', function () {
            let server;
            let chat;
            let enterSpy;

            before(function () {
                chat = new Chat();
                enterSpy = sinon.spy(chat, 'enter');
                server = new ChatServer(chat);
            });

            it('should be an instance of net.Server', function () {
                expect(server).to.be.instanceOf(net.Server);
            });

            describe('when a new connection is stablished', function () {
                let client;

                before(function () {
                    client = new net.Socket();
                    server.emit('connection', client);
                });

                it('should call chat.enter() passing the client as argument', function () {
                    expect(enterSpy.calledOnce).ok;
                    expect(enterSpy.calledWith(new User(client)));
                });
            });
        });
    });
});