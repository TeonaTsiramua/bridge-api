import { Schema, model } from 'mongoose';
import { Product, productSchema } from '../product/product.entity.js';

const CompanySchema = new Schema<any>({
  title: { type: 'String', required: true },
  slogan: { type: 'String', required: true },
  products: { type: [productSchema] },
  description: { type: 'String', required: true },
});

const Company = model<any>('Company', CompanySchema);

export { CompanySchema, Company };
