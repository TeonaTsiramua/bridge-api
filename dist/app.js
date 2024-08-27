import path from 'path';
import { buildAuthenticatedRouter } from '@adminjs/express';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import express from 'express';
import admin from './admin/admin.js';
import provider from './admin/auth-provider.js';
import initializeDb from './db/index.js';
import { __DIRNAME, CONNECTION_STRING, CORS_OPTIONS, PORT, SESSION_COOKIE_MAX_AGE } from './globalConstants.js';
import { productRouter } from './product/product.router.js';
const start = async () => {
    const app = express();
    app.use(express.json());
    app.use(cors(CORS_OPTIONS));
    app.set('trust proxy', true);
    try {
        await initializeDb();
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
    if (process.env.NODE_ENV === 'production') {
        await admin.initialize();
    }
    else {
        admin.watch();
    }
    const sessionStore = MongoStore.create({
        mongoUrl: CONNECTION_STRING,
        collectionName: 'sessions',
    });
    const router = buildAuthenticatedRouter(admin, {
        cookiePassword: process.env.COOKIE_SECRET,
        cookieName: 'adminjs',
        provider,
    }, null, {
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: SESSION_COOKIE_MAX_AGE,
        },
        name: 'adminjs',
    });
    app.use(express.static(path.join(__DIRNAME, 'public')));
    app.use('/assets/images', express.static(path.join(__DIRNAME, 'assets/images')));
    app.use(admin.options.rootPath, router);
    productRouter(app);
    return app;
};
start()
    .then((app) => {
    app.listen(PORT, () => {
        console.log(`AdminJS available at http://localhost:${PORT}${admin.options.rootPath}`);
    });
})
    .catch((error) => {
    console.error('Failed to start server:', error);
});
