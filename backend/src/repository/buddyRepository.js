const dbAccess = require("../db-access/database");
const connectToUsersCollection = dbAccess.connectToUsersCollection;
const closeDbConnection = dbAccess.closeDbConnection;

const updateBuddy = async (userId, buddyId) => {
    // get the id of the user who's adding the buddy and the id of the buddy who's being added:

    try {
        const users = await connectToUsersCollection();

        const query = { user_id: userId };

        const updateBuddiesArrayForUserId = {
            $push: { buddies: { user_id: buddyId } },
        };

        const response = await users.updateOne(
            query,
            updateBuddiesArrayForUserId
        );

        return { response };
    } catch (error) {
        console.log(error);
    }
};

const returnBuddies = async (buddieIds) => {
    try {
        const users = await connectToUsersCollection();

        const pipeline = [
            {
                $match: {
                    user_id: {
                        $in: buddieIds,
                    },
                },
            },
        ];

        const returnedBuddies = await users
            .aggregate(pipeline)
            .project({
                /* excludes hashed_password and email from returned data */
                hashed_password: 0,
                email: 0,
            })
            .toArray();

        return returnedBuddies;
    } catch (error) {
        console.log(error);
    } finally {
        closeDbConnection();
    }
};

module.exports = { updateBuddy, returnBuddies };
