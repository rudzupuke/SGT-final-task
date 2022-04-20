const dbAccess = require("../db-access/database");
const connectToUsersCollection = dbAccess.connectToUsersCollection;
const closeDbConnection = dbAccess.closeDbConnection;

const signUserUp = async (userData) => {
    try {
        const users = await connectToUsersCollection();

        const insertedUser = await users.insertOne(userData);

        return insertedUser;
    } finally {
        closeDbConnection();
    }
};

module.exports = { signUserUp };
