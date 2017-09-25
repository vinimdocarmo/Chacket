module.exports = class User {
    constructor(socket, username) {
        this.username = username;
        this.socket = socket;
    }

    setUsername(username) { this.username = username; }
}