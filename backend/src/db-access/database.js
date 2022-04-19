const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.z2sii.mongodb.net/Cluster0?retryWrites=true&w=majority`;
const dbName = "app-data";
const collectionName = "users";
const client = new MongoClient(uri);

module.exports = {
    connectToUsersCollection: async () => {
        await client.connect();
        const database = client.db(dbName);
        return database.collection(collectionName);
    },
    closeDbConnection: async () => {
        return await client.close();
    },
};
