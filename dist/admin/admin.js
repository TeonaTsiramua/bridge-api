import { Database, Resource } from '@adminjs/mongoose';
import AdminJS from 'adminjs';
import { STATICS_URL } from '../globalConstants.js';
import options from './options.js';
AdminJS.registerAdapter({
    Resource,
    Database,
});
const admin = new AdminJS({
    ...options,
    branding: {
        companyName: 'Bridge',
        favicon: `${STATICS_URL.href}logo.svg`,
        logo: `${STATICS_URL.href}logo.svg`,
    },
});
export default admin;
