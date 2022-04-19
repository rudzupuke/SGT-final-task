const { logUserIn } = require("../services/loginService");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { statusCode, message } = await logUserIn(email, password);
        res.status(statusCode).json(message);
    } catch (error) {
        console.log(error);
    }
};

module.exports = login;
