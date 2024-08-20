import { Buffer } from "buffer";
import { GridFSBucket } from "mongodb";
import { closeDatabaseConnection, connectToDatabase } from "./connect.js";

const DB_NAME = "bridge-test-cluster";


async function downloadWithGridFS(id) {
    const client = await connectToDatabase();
    try {
        const db = client.db(DB_NAME);
        const bucket = new GridFSBucket(db, { bucketName: "images" });

        const downloadStream = bucket.openDownloadStream(id);

        let dataBuffer = Buffer.alloc(0);

        const promise = new Promise((resolve, reject) => {
            downloadStream.on("data", (chunk) => {
                dataBuffer = Buffer.concat([dataBuffer, chunk]);
            });

            downloadStream.on("error", async (err) => {
                console.error(err);
                await closeDatabaseConnection(client);
                reject(err);
            });
            downloadStream.on("end", async () => {
                resolve(dataBuffer);
                await closeDatabaseConnection(client);
            });
        });

        return promise;
    } catch (error) {
        await closeDatabaseConnection(client);
        throw error;
    }
}

export { downloadWithGridFS };
