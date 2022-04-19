const dbAccess = require("../db-access/database");
const connectToUsersCollection = dbAccess.connectToUsersCollection;
const closeDbConnection = dbAccess.closeDbConnection;

const getUserByEmail = async (email) => {
    try {
        const users = await connectToUsersCollection();

        const user = await users.findOne({ email });

        return user;
    } finally {
        closeDbConnection();
    }
};

module.exports = { getUserByEmail };
