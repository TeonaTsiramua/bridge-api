import { Schema, model } from 'mongoose';
import { productSchema } from '../product/product.entity.js';

//company

const CompanySchema = new Schema({
  title: { type: 'String', required: true },
  slogan: { type: 'String', required: true },
  products: { type: [productSchema] },
  description: { type: 'String', required: true },
});

const Company = model('Company', CompanySchema);

export { Company, CompanySchema };

