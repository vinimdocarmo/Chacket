import React, {Component} from 'react';

export default class RoomsList extends Component {
    render() {
        let name;
        let preRoom;

        if (this.props.type === 'channel') {
            name = 'Channels';
        } else if (this.props.type === 'direct') {
            name = 'Direct Messages';
        }

        if (this.props.type === 'channel') {
            preRoom = <strong>#</strong>;
        } else if (this.props.type === 'direct') {
            preRoom = <strong>@</strong>;
        }

        return (
            <ul>
                <h6>{name}</h6>
                {
                    this.props.rooms.map(room =>
                            <li>
                                <a href="#">{preRoom} {room}</a>
                            </li>
                    )
                }
            </ul>
        );
    }
};