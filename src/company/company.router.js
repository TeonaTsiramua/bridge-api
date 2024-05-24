import { Router } from 'express';
import { Company } from './company.entity.js';
import { Product } from '../product/product.entity.js';

export const companyRouter = Router();

companyRouter.get('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  try {
    const companyObj = await Company.findOne();

    const products = await Product.find();

    if (!companyObj) {
      return res.status(404).json({ message: 'Not found' });
    }

    companyObj.products = products;
    companyObj.save();

    res.json(companyObj);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
