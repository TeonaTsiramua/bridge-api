import { Schema, model } from 'mongoose';
const imageSchema = new Schema({
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
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
});
const Image = model('Image', imageSchema);
export { Image, imageSchema };
