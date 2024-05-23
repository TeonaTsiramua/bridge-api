import { AdminResource } from "../types.js";
import { Product } from "./product.entity.js";

const ProductResource: AdminResource = {
    resource: Product,
    options: {
        navigation: {
            icon: "Package"
        },
        properties: {
            _id: {
                isVisible: { list: false, show: true, edit: false, filter: true }
            }
        }
    }
};

export { ProductResource };
