import { list, read } from './product.controller.js';
const productRouter = (app) => {
    app.route('/test-product-route').get(list);
    app.route('/test-product-route/:_id').get(read);
};
export { productRouter };
