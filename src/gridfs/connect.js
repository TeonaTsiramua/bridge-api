import { MongoClient } from 'mongodb';

async function connectToDatabase() {
    const client = new MongoClient(process.env.MONGODB_URI || process.env.DATABASE_URL);
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
        return client;
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error;
    }
}

async function closeDatabaseConnection(client) {
    try {
        await client.close();
        console.log("MongoDB connection closed");
    } catch (error) {
        console.error("Failed to close MongoDB connection", error);
    }
}

export { connectToDatabase, closeDatabaseConnection };