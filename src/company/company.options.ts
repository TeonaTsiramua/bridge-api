import { AdminResource } from "../types.js";
import { Company } from "./company.entity.js";

const CompanyResource: AdminResource = {
    resource: Company,
    options: {
        navigation: {
            icon: "Globe"
        },
        properties: {
            _id: {
                isVisible: { list: false, show: false, edit: false, filter: true }
            }
        }
    }
};

export { CompanyResource };
