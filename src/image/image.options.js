import { ObjectId } from "mongodb";
import { Components } from "../components/ComponentLoader.js";
import { deleteWithGridFS } from "../gridfs/deleteWithGridFS.js";
import { Image } from "./image.entity.js";


/**
 * @type {import("adminjs").ResourceOptions}
 */
const ImageResource = {
    resource: Image,
    options: {
        navigation: {
            icon: "Image"
        },
        properties: {
            _id: {
                isVisible: { list: false, show: true, edit: false, filter: true }
            },
            data: { components: { edit: Components.ImageUploader, show: Components.ImageShow, list: Components.ImageShow } },
            name: { isVisible: { list: true, show: true, edit: false, filter: true } },
            contentType: { isVisible: { list: true, show: true, edit: false, filter: true } },
            bucketId: { isVisible: { list: true, show: true, edit: false, filter: true } }
        },
        actions: {
            delete: {
                after: async (response, _, context) => {
                    const record = context.record;

                    if (record && record.params?.bucketId) {
                        deleteWithGridFS(new ObjectId(record.params.bucketId));
                    }
                    return response;
                },
            },
        }
    },
};

export { ImageResource };
