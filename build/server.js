import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose';
import AdminJS from 'adminjs';
import dotenv from 'dotenv';
import express from 'express';
import { connect } from 'mongoose';
import { options } from './options.js';
import { productRouter } from './product/product.router.js';
dotenv.config();
const PORT = process.env.PORT || 3000;
const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
};
const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
};
AdminJS.registerAdapter({
    Resource: Resource,
    Database: Database,
});
export const start = async () => {
    const app = express();
    await connect(process.env.DATABASE_URL);
    const admin = new AdminJS(options);
    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
        authenticate,
        cookieName: 'adminjs',
        cookiePassword: 'sessionsecret',
    }, null, {
        resave: true,
        saveUninitialized: true,
        secret: 'sessionsecret',
        name: 'adminjs',
    });
    app.use(express.json());
    productRouter(app);
    app.use(admin.options.rootPath, adminRouter);
    app.listen(PORT, () => {
        console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
    });
};
