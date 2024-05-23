import { Express } from 'express';
import { list, read } from './product.controller.js';

const productRouter = (app: Express) => {
    app.route("/test-product-route").get(list);
    app.route("/test-product-route/:_id").get(read);
};

export { productRouter };
