import { Components } from "../components/ComponentLoader.js";
import { Product } from "./product.entity.js";
import uploadFeature from "@adminjs/upload";
import { componentLoader } from "../components/ComponentLoader.js";

const localProvider = {
	bucket: "public/files",
	opts: {
		baseUrl: "/files",
	},
};

const ProductResource = {
	resource: Product,
	options: {
		navigation: {
			icon: "Package",
		},
		properties: {
			_id: {
				isVisible: { list: false, show: false, edit: false, filter: true },
			},
			"images.s3Key": {
				isVisible: { list: false, show: false, edit: false, filter: true },
			},
			"images.bucket": {
				isVisible: { list: false, show: false, edit: false, filter: true },
			},
			"images.mime": {
				isVisible: { list: false, show: false, edit: false, filter: true },
			},
			"images.createdAt": {
				isVisible: { list: false, show: false, edit: false, filter: true },
			},
			"images.updatedAt": {
				isVisible: { list: false, show: false, edit: false, filter: true },
			},
		},
	},
	features: [
		uploadFeature({
			multiple: true,
			componentLoader,
			provider: { local: localProvider },
			properties: { file: "images", key: "images.s3Key", bucket: "images.bucket", mimeType: "images.mime" },
			validation: { mimeTypes: ["image/png", "image/jpeg"] },
		}),
	],
};

export { ProductResource };
