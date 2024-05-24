import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  title: { type: String, required: true }
});

const Product = model('Product', productSchema);

export { productSchema, Product };
