import { Schema, model } from 'mongoose';

type ImageType = {
    s3Key: string[];
    bucket: string[];
    mime: string[];
};

const imageSchema = new Schema<ImageType>(
    {
        s3Key: {
            type: [String],
            required: false,
        },
        bucket: {
            type: [String],
            required: false,
        },
        mime: {
            type: [String],
            required: false,
        },
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    }
);

const Image = model('Image', imageSchema);

export { Image, ImageType, imageSchema };
