import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    passwordHash: bcrypt.hashSync('password', 10),
};
const PORT = process.env.PORT || 3000;
const SESSION_COOKIE_MAX_AGE = 1000 * 60 * 60 * 24;
const CORS_OPTIONS = {
    origin: true,
    credentials: true,
};
const STATICS_URL = (() => {
    const prod = process.env.NODE_ENV === 'production';
    const url = new URL('/', prod ? process.env.PUBLIC_URL : `${process.env.DEVELOPMENT_URL}:${process.env.PORT}`);
    return url;
})();
const CONNECTION_STRING = process.env.DATABASE_URL;
const __filename = fileURLToPath(import.meta.url);
const __DIRNAME = dirname(__filename);
export { __DIRNAME, CONNECTION_STRING, CORS_OPTIONS, DEFAULT_ADMIN, PORT, SESSION_COOKIE_MAX_AGE, STATICS_URL };
