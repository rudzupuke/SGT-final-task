const dbAccess = require("../db-access/database");
const connectToUsersCollection = dbAccess.connectToUsersCollection;
const closeDbConnection = dbAccess.closeDbConnection;

const getUsers = async (loggedInUserId) => {
    try {
        const users = await connectToUsersCollection();

        const returnedUsers = await users
            .find(
                /* excludes user who's logged in from results */
                { user_id: { $ne: loggedInUserId } },
                /* excludes hashed_password and email field from returned data */
                {
                    projection: {
                        hashed_password: 0,
                        email: 0,
                    },
                }
            )
            .toArray();

        // filter out those users who are already buddies with user from returned results:
        const filteredUsers = returnedUsers.filter(({ buddies }) => {
            // check if at least one of the buddies array elements contain user_id that is equal to the user's who's logged in:
            if (buddies.some((buddy) => buddy.user_id === loggedInUserId)) {
                // return false to filter this user out
                return false;
            } else return true;
        });

        return filteredUsers;
    } catch (error) {
        console.log(error);
    }
};

const getUser = async (userId) => {
    try {
        const users = await connectToUsersCollection();
        const query = { user_id: userId };
        const user = await users.findOne(query);
        return user;
    } catch (error) {
        // await closeDbConnection();
        console.log(error);
    }
};

module.exports = { getUsers, getUser };
