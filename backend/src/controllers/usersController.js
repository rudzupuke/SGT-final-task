const usersRepository = require("../repository/usersRepository");

///// Returns all users except buddies (for the find buddies page):
const getUsers = async (req, res) => {
    const loggedInUserId = req.query.userId;

    const users = await usersRepository.getUsers(loggedInUserId);

    res.send(users);
};

//// Returns one user based on its userId:
const getUser = async (req, res) => {
    const userId = req.params.userId;

    const user = await usersRepository.getUser(userId);

    res.send(user);
};

module.exports = { getUsers, getUser };
