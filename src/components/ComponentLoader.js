import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
    ImageUploader: componentLoader.add('ImageUploader', './ImageUploader'),
    ImageShow: componentLoader.add('ImageShow', './ImageShow'),
};

export { componentLoader, Components };