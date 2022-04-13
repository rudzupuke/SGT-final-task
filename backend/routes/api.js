const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.z2sii.mongodb.net/Cluster0?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

router.get("/", (req, res) => {
    res.json("Hello to my app");
});

router.post("/signup", async (req, res) => {
    console.log(req.body);
    const { name, breed, picture, age, character, bio, email, password } =
        req.body.formData;
    // generate random userId using uuid package:
    const generatedUserId = uuidv4();

    //hash the password using bcrypt package:
    const hashedPassword = await bcrypt.hash(password, 10);

    // change email to lower case:
    const sanitizedEmail = email.toLowerCase();

    // send data to database:
    try {
        await client.connect();
        const database = client.db("app-data");
        const users = database.collection("users");

        //check if user already doesn't exist by checking provided email:
        const user = await users.findOne({ email });
        if (user) {
            return res.status(409).send("User already exists. Please login.");
        }

        //make data object:
        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword,
            name: name,
            breed: breed,
            picture: picture,
            age: age,
            character: character,
            bio: bio,
        };

        // insert data object into database:
        const insertedUser = await users.insertOne(data);

        // generate token:
        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24,
        });

        res.status(201).json({
            token,
            userId: generatedUserId,
            email: sanitizedEmail,
        });
    } catch (err) {
        console.log(err);
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        await client.connect();
        const database = client.db("app-data");
        const users = database.collection("users");

        //find user based on email:
        const user = await users.findOne({ email });

        const correctPassword = await bcrypt.compare(
            password,
            user.hashed_password
        );
        if (user && correctPassword) {
            const token = jwt.sign(user, email, {
                expiresIn: 60 * 24,
            });
            res.status(201).json({ token, userId: user.user_id, email });
        } else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
    }
});

router.get("/user", async (req, res) => {
    const userId = req.query.userId;

    try {
        await client.connect();
        const database = client.db("app-data");
        const users = database.collection("users");

        const query = { user_id: userId };
        const user = await users.findOne(query);
        res.send(user);
    } finally {
        await client.close();
    }
});

router.get("/users", async (req, res) => {
    // client sends user_id of user currently logged in as userId:
    const userId = req.query.userId;

    try {
        await client.connect();
        const database = client.db("app-data");
        const users = database.collection("users");

        const returnedUsers = await users
            .find(
                /* excludes user who's logged in from results */
                { user_id: { $ne: userId } },
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
            if (buddies.some((buddy) => buddy.user_id === userId)) {
                // return false to filter this user out
                return false;
            } else return true;
        });

        res.send(filteredUsers);
    } finally {
        await client.close();
    }
});

router.post("/addbuddy", async (req, res) => {
    // get the id of the user who's adding the buddy and the id of the buddy who's being added:
    const { userId, buddyUserId } = req.body;
    console.log(userId, buddyUserId);

    try {
        await client.connect();
        const database = client.db("app-data");
        const users = database.collection("users");

        const queryOne = { user_id: userId };
        const queryTwo = { user_id: buddyUserId };

        const updateBuddiesArrayForUserId = {
            $push: { buddies: { user_id: buddyUserId } },
        };

        const updateBuddiesArrayForBuddyUserId = {
            $push: { buddies: { user_id: userId } },
        };

        const userOne = await users.updateOne(
            queryOne,
            updateBuddiesArrayForUserId
        );
        const userTwo = await users.updateOne(
            queryTwo,
            updateBuddiesArrayForBuddyUserId
        );
        res.send({ userOne, userTwo });
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
});

router.get("/buddies", async (req, res) => {
    const buddieIds = JSON.parse(req.query.buddieIds);

    try {
        await client.connect();
        const database = client.db("app-data");
        const users = database.collection("users");

        const pipeline = [
            {
                $match: {
                    user_id: {
                        $in: buddieIds,
                    },
                },
            },
        ];

        const returnedBuddies = await users.aggregate(pipeline).toArray();

        res.send(returnedBuddies);
    } finally {
        await client.close();
    }
});

module.exports = router;
