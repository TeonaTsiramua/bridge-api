import { Schema, model } from 'mongoose';
export const productSchema = new Schema({
    title: { type: 'String', required: true },
});
export const Product = model('Product', productSchema);
