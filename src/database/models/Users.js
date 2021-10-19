const Table = require('./Table');

class Users {
    constructor() {
        this.table = new Table("users");
    }

    createUser(newUser) {
        return this.table.createEntry(newUser);
    }

    getUser(user) {
        return this.table.getEntry("*", [`userName = '${user.userName}'`, `email = '${user.email}'`]);
    }

    getUserById(userId) {
        return this.table.getEntry(["id", "firstName", "lastName", "userName", "email", "password"], `id='${userId}'`);
    }

    getAllUsers() {
        return this.table.getEntrys("*");
    }

    removeUser(userId) {
        return this.table.removeEntrys(`id=${userId}`);
    }

    updateUser(userId, updateObject) {
        return this.table.updateEntrys(`id=${userId}`, updateObject);
    }
}

module.exports = new Users;