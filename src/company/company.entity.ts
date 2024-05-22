import { Schema, model } from 'mongoose';
import { Product, productSchema } from '../product/product.entity.js';

export const CompanySchema = new Schema<any>({
  title: { type: 'String', required: true },
  slogan: { type: 'String', required: true },
  products: { type: [productSchema] },
  description: { type: 'String', required: true },
});

export const Company = model<any>('Company', CompanySchema);
