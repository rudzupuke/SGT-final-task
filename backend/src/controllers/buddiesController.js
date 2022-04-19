////// RETURNS USER'S BUDDIES DATA FROM PROVIDEd BUDDY IDS (FROM THE BUDDIES ARRAY IN THE USER'S DOCUMENT)

const { updateBuddy } = require("../services/buddyService");
const { returnBuddies } = require("../repository/buddyRepository");

// returns array of buddies based on their ids:
const getBuddies = async (req, res) => {
    const buddieIds = JSON.parse(req.query.buddieIds);

    try {
        const returnedBuddies = await returnBuddies(buddieIds);
        res.send(returnedBuddies);
    } catch (error) {
        console.log(error);
    }
};

const addBuddy = async (req, res) => {
    // get the id of the user who's adding the buddy and the id of the buddy who's being added:
    const { userId, buddyUserId } = req.body;

    try {
        const response = await updateBuddy(userId, buddyUserId);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getBuddies, addBuddy };
