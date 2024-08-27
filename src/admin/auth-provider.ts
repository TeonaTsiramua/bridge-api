import { DefaultAuthProvider } from 'adminjs';
import bcrypt from 'bcrypt';

import { DEFAULT_ADMIN } from '../globalConstants.js';

import componentLoader from './component-loader.js';

const provider = new DefaultAuthProvider({
    componentLoader,
    authenticate: async ({ email, password }) => {
        console.log(`Attempting to authenticate user: ${email}`);
        if (email === DEFAULT_ADMIN.email && bcrypt.compareSync(password, DEFAULT_ADMIN.passwordHash)) {
            console.log('Authentication successful');
            return Promise.resolve(DEFAULT_ADMIN);
        }
        console.log('Authentication failed');
        return null;
    },
});

export default provider;
