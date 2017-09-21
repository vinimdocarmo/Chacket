export default class Channel {
    constructor(name) {
        this.name = name;
        this.users = [];
    }

    add(user) {
        this.users.push(user);
    }

    getUsers() {
        return this.users;
    }
};