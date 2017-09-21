import {expect} from 'chai';
import Chat from '../Chat';

describe('chat', function () {
    describe('when a new chat is created', function () {
        const chat = new Chat();

        it('should have only one default channel', function () {
            expect(chat.channels).to.have.length(1);
        });

        it('default channel should have name \'general\'', function () {
            const channel = chat.channels[0];
            expect(channel.name).to.be.equal('general');
        });

        describe('when a new user enter the chat', function () {
            let newUser = { username: 'vinimdocarmo'};
            chat.enter(newUser);

            it('the user must be put in channel the defaul channel', function () {
                const usersInGeneral = chat.findChannel('general').users;
                expect(usersInGeneral).to.include(newUser);
            });
        });
    });
    
});