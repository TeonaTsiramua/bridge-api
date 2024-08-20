import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
    ImageUploader: componentLoader.add('ImageUploader', './ImageUploader.jsx'),
    ImageShow: componentLoader.add('ImageShow', './ImageShow.jsx'),
};

export { componentLoader, Components };