import { Schema, model } from 'mongoose';

const ImageSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    contentType: { type: String, required: true },
    bucketId: { type: String, required: true }
});

const Image = model('Image', ImageSchema);

export { Image, ImageSchema };

