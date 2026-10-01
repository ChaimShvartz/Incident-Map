import { MongoClient } from "mongodb";

const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI);

async function runStableAPIConnect() {
    try {
        await client.connect();
        console.log("You successfully connected to MongoDB!");
        return client.db("incident-map");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export const db = await runStableAPIConnect();
