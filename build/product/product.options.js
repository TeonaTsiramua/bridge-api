import { Product } from "./product.entity.js";
const ProductResource = {
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
