var dotenv = require('dotenv');

const envFound = dotenv.config();
if(envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
    dbSecret: process.env.DB_SECRET,
    tokenSecret: process.env.TOKEN_SECRET
}