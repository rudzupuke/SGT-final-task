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
  const { name, breed, picture, age, character, bio, email, password } =
    req.body;

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

    res
      .status(201)
      .json({ token, userId: generatedUserId, email: sanitizedEmail });
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
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } finally {
    await client.close();
  }
});

module.exports = router;
