import { AdminJSOptions } from "adminjs";
import { CompanyResource } from "./company/company.options.js";
import { ProductResource } from "./product/product.options.js";

const options: AdminJSOptions = {
    resources: [
        CompanyResource,
        ProductResource
    ],
    branding: {
        companyName: "Bridge"
    }
}

export { options };