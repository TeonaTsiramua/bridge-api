import { CompanyResource } from "./company/company.options.js";
import { componentLoader } from './components/ComponentLoader.js';
import { ProductResource } from "./product/product.options.js";

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
    ],
    componentLoader
};

export { options };
