'use strict';

const {expect} = require('chai');
const net = require('net');
const ChatClient = require('../ChatClient');
const ChatServer = require('../ChatServer');
const sinon = require('sinon');

describe('server', function () {
    describe('when a new chat server is created', function () {
        describe('without passing a clients handler as the first argument', function () {
            it('should thrown a TypeError', function () {
                try {
                    new ChatServer();
                    throw new Error('should not throw');
                } catch (error) {
                    expect(error).to.be.throw;
                }
            });
        });

        describe('passing a clients handler as the first argument', function () {
            const clienstsHandlerSpy = { addClient: sinon.spy() };
            const server = new ChatServer(clienstsHandlerSpy); 

            it('should be an instance of net.Server', function () {
                expect(server).to.be.instanceOf(net.Server);
            });

            describe('when a new connection is stablished', function () {
                const client = {};
                server.emit('connection', client);

                it('should call clientsHandler.addClient() passing the client as argument', function () {
                    expect(clienstsHandlerSpy.addClient.calledOnce).ok;
                    expect(clienstsHandlerSpy.addClient.calledWith(client));
                });
            });
        });
    });
    
});