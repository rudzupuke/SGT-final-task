const { getUserByEmail } = require("../repository/loginRepository");
const signupRepository = require("../repository/signupRepository");

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const signUserUp = async (reqBody) => {
    const { name, breed, picture, age, character, bio, email, password } =
        reqBody;

    const user = await getUserByEmail(email);

    //check if user already doesn't exist by checking provided email:
    if (user) {
        const statusCode = 409;
        const message = { message: "User already exists. Please login." };
        return { statusCode, message };
    }

    //  generate random userId using uuid package:
    const generatedUserId = uuidv4();

    //hash the password using bcrypt package:
    const hashedPassword = await bcrypt.hash(password, 10);

    // change email to lower case:
    const sanitizedEmail = email.toLowerCase();

    //make data object:
    const userData = {
        user_id: generatedUserId,
        email: sanitizedEmail,
        hashed_password: hashedPassword,
        name: name,
        breed: breed,
        picture: picture,
        age: age,
        character: character,
        bio: bio,
        buddies: [],
    };

    // insert data object into database:
    const signedUpUser = await signupRepository.signUserUp(userData);

    // generate token:
    const token = getToken(signedUpUser, sanitizedEmail);

    const statusCode = 201;
    // returns token, userId & email to be added to cookies on frontend:
    const message = {
        token,
        userId: generatedUserId,
        email: sanitizedEmail,
    };

    return { statusCode, message };
};

const getToken = (user, email) => {
    const token = jwt.sign(user, email, {
        expiresIn: 60 * 24,
    });

    return token;
};

module.exports = { signUserUp };
