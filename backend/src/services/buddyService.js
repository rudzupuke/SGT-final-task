const buddyRepository = require("../repository/buddyRepository");
const usersRepository = require("../repository/usersRepository");

const updateBuddy = async (buddyId1, buddyId2) => {
    const buddy1 = await usersRepository.getUser(buddyId1);
    const buddy2 = await usersRepository.getUser(buddyId2);

    if (
        (buddy1.buddies.length === 0 ||
            buddy1.buddies.some((buddy) => buddy.user_id !== buddyId2)) &&
        (buddy2.buddies.length === 0 ||
            buddy2.buddies.some((buddy) => buddy.user_id !== buddyId1))
    ) {
        buddyRepository.updateBuddy(buddyId1, buddyId2);
        buddyRepository.updateBuddy(buddyId2, buddyId1);
    }
};

module.exports = { updateBuddy };
