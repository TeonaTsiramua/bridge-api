import { CompanyResource } from "./company/company.options.js";
import { ProductResource } from "./product/product.options.js";

const options = {
    resources: [
        CompanyResource,
        ProductResource
    ]
}

export { options };
