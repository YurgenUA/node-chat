'use explicit';


class Users {

    constructor() {
        this.users = [];
    }

    addUser (id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        let userToRemove = this.getUser(id);

        this.users = this.users.filter(x => x.id !== id);
        return userToRemove;
    }

    getUser(id){
        return this.users.filter(x => x.id === id)[0];

    }

    getUserList(room){
        let users = this.users.filter( x => x.room === room);
        return users.map(x => x.name);
    }
}

module.exports = {Users}