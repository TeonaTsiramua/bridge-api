import { ProductResource } from '../product/product.options.js';
import componentLoader from './component-loader.js';
const options = {
    componentLoader,
    rootPath: '/admin',
    resources: [ProductResource],
    databases: [],
};
export default options;
