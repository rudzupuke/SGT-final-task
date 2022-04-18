# Dinder - App for Finding Your Dog a Playdate

Dinder is an online app that will help dogowners find the perfect buddy for they pets' playdates.

This project is built using Create React App and demonstrates the following web development skills:

-   HTML, CSS and SCSS
-   React (using hooks and functional components)
-   Creating layouts and page design
-   NoSQL database (MongoDB)
-   Node.js and using Express to set up a back end server
-   Using REST API and creating requests to a database with Fetch and Axios

## Dependencies

You need [Node.js](https://nodejs.dev/) and npm installed on you computer. Use **version 14.0.0 or higher of Node.js**.

## Getting started in development mode

1. Clone this repo to your local machine.

2. To run the Create React App development server, open the terminal and run `cd frontend` followed by `npm install` in that folder on your local machine. Once the dependencies are done installing, execute `npm start` and the app will run on http://localhost:3000.

3. Create an account with [MongoSB](https://www.mongodb.com/) and set up the database. There should be two collection - one for users, the other for chat. The user object should contain the following keys: \_id, user_id, email, hashed_password, breed, picture, age, character, bio, buddies.

4. Create a `.env` file in the bckend folder that contains your MongoDB username and the project password. Make sure that the URI in api.js is correct for your MongoDB cluster.
    ```
    MONGO_DB_USERNAME = ********
    MONGO_DB_PASSWORD = *********************
    ```
5. `cd backend` from the root of the project and run `npm install` followed by `npm run start:backend`. The server runs on http://localhost:8000.

## Production mode

Coming soon

## Known issues and functionality that is to be added

This is still work in progress, therefore the chat functionality has not been added yet.
