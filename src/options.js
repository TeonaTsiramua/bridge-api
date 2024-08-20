import { CompanyResource } from "./company/company.options.js";
import { ImageResource } from "./image/image.options.js";
import { ProductResource } from "./product/product.options.js";
import { componentLoader } from './components/ComponentLoader.js';

/**
 * @typedef {import("adminjs").AdminJSOptions} Options
 */

/**
 * @type {Options}
 */
const options = {
    resources: [
        CompanyResource,
        ProductResource,
        ImageResource
    ],
    componentLoader
};

export { options };
