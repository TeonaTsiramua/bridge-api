import { GridFSBucket } from "mongodb";
import { connectToDatabase, closeDatabaseConnection } from "./connect.js";
import { Readable } from "stream";

const DB_NAME = "bridge-test-cluster";


async function uploadWithGridFS(file, metadata) {
    const client = await connectToDatabase();
    try {
        const db = client.db(DB_NAME);
        const bucket = new GridFSBucket(db, { bucketName: "images" });

        const uploadStream = bucket.openUploadStream(file.originalname, { metadata });
        const bufferStream = Readable.from(file.buffer);

        const uploadPromise = new Promise((resolve, reject) => {
            bufferStream.pipe(uploadStream)
                .on('error', async (err) => {
                    reject(err);
                    await closeDatabaseConnection(client); // Close connection on error
                })
                .on("finish", async () => {
                    resolve(uploadStream.id);
                    await closeDatabaseConnection(client); // Close connection on finish
                });
        });

        return uploadPromise;
    } catch (error) {
        closeDatabaseConnection(client); // Ensure connection is closed on catch
        throw error;
    }
}

export { uploadWithGridFS };