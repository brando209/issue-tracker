const bcrypt = require('bcryptjs');
const config = require('../../config');
const { Users } = require('../../database/models');

class UserService {

    async changePassword(userId, currentPassword, newPassword) {
        const userRecord = await Users.getUserById(userId);
        if(!userRecord.success) throw new Error("The provided user id does not exist.");
        const user = userRecord.data;

        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if(!validPassword) throw new Error("Incorrect Password");

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const update = { password: hashedPassword };
        const passwordChanged = await Users.updateUser(userId, update);
        if(!passwordChanged.success) throw new Error("Unable to update user password");

        return passwordChanged;
    }

    async getAccountDetails(userId) {
        const userRecord = await Users.getUserById(userId);
        if(!userRecord.success) throw new Error("Unable to retrieve user account details");
        delete userRecord.data.password;
        return userRecord.data;
    }

    async getAllAccountDetails() {
        const users = await Users.getAllUsers();
        if(!users.success) throw new Error("Unable to retrieve user account details");
        users.data.forEach((user, i, arr) => {
            delete user.password;
            arr[i] = user;
        })
        return users.data;
    }

    async changeAccountDetails(userId, newDetails) {
        const detailsChanged = await Users.updateUser(userId, newDetails);
        if(!detailsChanged.success) throw new Error("Unable to update user account details");
        return this.getAccountDetails(userId);
    }

    async deleteAccount(userId) {
        const userDeleted = await Users.removeUser(userId);
        if(!userDeleted.success) throw new Error("Unable to delete user account");

        return userDeleted.data;
    }

}

module.exports = new UserService;
