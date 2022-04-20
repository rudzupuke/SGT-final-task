const { getUserByEmail } = require("../repository/loginRepository");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const logUserIn = async (email, password) => {
    const user = await getUserByEmail(email);

    if (!user) {
        const statusCode = 400;
        const message = { error: "User does not exist" };
        return { statusCode, message };
    }

    const correctPassword = await bcrypt.compare(
        password,
        user.hashed_password
    );

    if (user && correctPassword) {
        const token = getToken(user, email);

        const statusCode = 201;
        const message = {
            token,
            userId: user.user_id,
            email,
            name: user.name,
        };

        return { statusCode, message };
    } else {
        const statusCode = 400;
        const message = { error: "Invalid Credentials" };
        return { statusCode, message };
    }
};

const getToken = (user, email) => {
    const token = jwt.sign(user, email, {
        expiresIn: 60 * 24,
    });

    return token;
};

module.exports = { logUserIn };
