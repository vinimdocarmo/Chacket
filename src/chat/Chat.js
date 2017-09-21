import Channel from './Channel';
import _ from 'underscore';

export default class Chat {
    constructor() {
        this.channels = [];

        this.channels.push(new Channel('general'));
    }

    enter(user) {
        this.findChannel('general').add(user);
    }

    findChannel(channelName) {
        return _.findWhere(this.channels, channel => channel.name === channelName);
    }
};