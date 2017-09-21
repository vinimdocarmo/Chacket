import React, {Component} from 'react';

export default class MessageSender extends Component {

    render() {
        return (
            <form>
                <fieldset>
                    <textarea placeholder="Type your message here"></textarea>
                    <input className="button-primary" type="submit" value="Send" />
                </fieldset>
            </form>
        );
    }
};