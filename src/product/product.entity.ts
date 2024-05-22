import { Schema, model } from 'mongoose';

export const productSchema = new Schema<{ title: string }>({
  title: { type: 'String', required: true },
});

export const Product = model<{ title: string }>('Product', productSchema);
