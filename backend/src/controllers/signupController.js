const { signUserUp } = require("../services/signupService");

const signup = async (req, res) => {
    try {
        const { statusCode, message } = await signUserUp(req.body.formData);
        res.status(statusCode).json(message);
    } catch (err) {
        console.log(err);
    }
};

module.exports = signup;
