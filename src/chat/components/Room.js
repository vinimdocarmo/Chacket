import React, {Component} from 'react';
import Message from './Message';
import MessageSender from './MessageSender';

export default class Room extends Component {
    render() {
        return (
            <div>
                <header>
                    <h2>#general</h2>
                </header>
                <div className="messages">
                    <Message />
                </div>
                <div>
                    <MessageSender />
                </div>
            </div>
        );
    }
};