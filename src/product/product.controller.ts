import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { STATICS_URL } from 'src/globalConstants.js';

import { Product } from './product.entity.js';

const list = async (req: Request, res: Response) => {
    try {
        const items = await Product.find({ ...req.query }).lean();
        if (items) {
            const response = items.map((item) => {
                const images = item.images.s3Key.map(
                    (key, index) => `${STATICS_URL.href}${item.images.bucket[index]?.replace('./', '')}/${key}`
                );
                const obj = { ...item, id: item._id.toString(), images };
                delete obj._id;
                return obj;
            });
            res.json(response);
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};

const read = async (req: Request, res: Response) => {
    try {
        if (!Types.ObjectId.isValid(req.params._id)) {
            return res.status(400).json({ status: 400, message: 'Invalid ID format' });
        }

        const item = await Product.findById(req.params._id).lean();

        if (!item) {
            return res.status(404).json({ status: 404, messsage: 'Not Found' });
        }

        const images = item.images.s3Key.map(
            (key, index) => `${STATICS_URL.href}${item.images.bucket[index]?.replace('./', '')}/${key}`
        );
        const response = { ...item, id: item._id.toString(), images };
        delete response._id;

        return res.json(response);
    } catch (error) {
        return res.status(500).json({ status: 500, message: error });
    }
};

export { list, read };
