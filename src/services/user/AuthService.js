const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users } = require('../../database/models');

class AuthService {

    async register(user) {
        // Check if the userName and email already exist in the database
        const userFound = await Users.getUser(user);
        if (userFound.success) throw new Error("Username or email already exists");

        // Hash the new user password
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        const newUser = user;
        delete newUser.confirmPassword;

        //Add new user to database
        const userCreated = await Users.createUser(newUser);
        if (!userCreated.success) throw new Error("User not created")

        const userRecord = await Users.getUserById(userCreated.id);
        if(!userRecord.success) throw new Error("Unable to retrieve user record")

        return userRecord.data
    }

    async login(credentials) {
        //Verify that the user exists
        const userFound = await Users.getUser({ userName: credentials.userName, email: credentials.email })
        if (!userFound.success) throw new Error("User does not exist");
        const user = userFound.data;
        // Verify that the password is correct
        const validPassword = await bcrypt.compare(credentials.password, user.password);
        if (!validPassword) throw new Error("Invalid password.");
        
        delete user.password
        const token = this.generateToken(user);
        
        return { user, token }
    }

    generateToken(user) {
        return jwt.sign({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email
        }, process.env.TOKEN_SECRET);
    }

}

module.exports = new AuthService;