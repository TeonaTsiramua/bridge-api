import { Buffer } from "buffer";
import { GridFSBucket } from "mongodb";
import { closeDatabaseConnection, connectToDatabase } from "./connect.js";

const DB_NAME = "bridge-test-cluster";


async function deleteWithGridFS(id) {
    const client = await connectToDatabase();
    try {
        const db = client.db(DB_NAME);
        const bucket = new GridFSBucket(db, { bucketName: "images" });

        await bucket.delete(id).then(async () => {
            console.log("deleted successfully");
            await closeDatabaseConnection(client);
        }).catch(async (error) => {
            console.error(error);
            await closeDatabaseConnection(client);
        });
    } catch (error) {
        closeDatabaseConnection(client);
        throw error;
    }
}

export { deleteWithGridFS };
