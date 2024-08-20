import { ComponentLoader } from 'adminjs';
import path from "path";
import { fileURLToPath } from "url";

const componentLoader = new ComponentLoader();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Components = {
    ImageUploader: componentLoader.add('ImageUploader', path.resolve(__dirname, "ImageUploader")),
    ImageShow: componentLoader.add('ImageShow', path.resolve(__dirname, "ImageShow")),
};

export { componentLoader, Components };