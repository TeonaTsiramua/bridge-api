import { ComponentLoader } from 'adminjs';
import path from "path";

const componentLoader = new ComponentLoader();

const Components = {
    ImageUploader: componentLoader.add('ImageUploader', path.resolve('./src/components/ImageUploader.jsx')),
    ImageShow: componentLoader.add('ImageShow', path.resolve('./src/components/ImageShow.jsx')),
};

export { componentLoader, Components };
