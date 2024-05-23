import { NextFunction, Request, Response } from "express";
import { Product, productSchema } from "./product.entity.js";
import { Types } from "mongoose";

const list = async (req: Request, res: Response) => {
    try {
        const items = await Product.find({ ...req.query });
        if (items) {
            const response = items.map((item) => ({ id: item.id, title: item.title }));
            res.json(response);
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

const read = async (req: Request, res: Response) => {
    try {
        if (!Types.ObjectId.isValid(req.params._id)) {
            return res.status(400).json({ status: 400, message: 'Invalid ID format' });
        }

        const item = await Product.findById(req.params._id);

        if (!item) {
            return res.status(404).json({ status: 404, messsage: "Not Found" });
        }

        const response = { id: item?.id, title: item?.title };
        res.json(response);

    } catch (error) {
        res.status(500).json({ status: 500, message: error });
    }
};

export { list, read };