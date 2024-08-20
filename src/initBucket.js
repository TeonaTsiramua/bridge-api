import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';

let bucket = null;

const initializeBucket = async () => {
    if (!bucket) {
        const connection = await mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        bucket = new GridFSBucket(connection.connection.db, {
            bucketName: 'images',
        });

        console.log('GridFSBucket initialized');
    }

    return bucket;
};

/**
 * 
 * @typedef {import('mongodb').GridFSBucket} Type
 */

/**
 * @type {() => Promise<Type>}
 */
export const getBucket = async () => {
    if (!bucket) {
        await initializeBucket();
    }
    return bucket;
};