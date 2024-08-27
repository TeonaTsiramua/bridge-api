import path from 'path';

import { ComponentLoader } from 'adminjs';

import { __DIRNAME } from '../globalConstants.js';

const componentLoader = new ComponentLoader();

const Components = {
    TextArea: componentLoader.add('TextArea', path.join(__DIRNAME, 'components/TextArea')),
};

export { Components };

export default componentLoader;
