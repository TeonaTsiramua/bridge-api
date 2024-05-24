import AdminJSExpress from '@adminjs/express';
import { DefaultAuthProvider } from 'adminjs';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connect } from 'mongoose';
import admin from '../src/index.js';
import { productRouter } from '../src/product/product.router.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async ({ email, password }, ctx) => {
  console.log(`Attempting to authenticate user: ${email}`);
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    console.log('Authentication successful');
    return Promise.resolve(DEFAULT_ADMIN);
  }
  console.log('Authentication failed');
  return null;
};

const createServer = async () => {
  const app = express();
  try {
    await connect(process.env.MONGODB_URI || process.env.DATABASE_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('MongoDB connection error:', error);
  }

  app.use(express.json());

  const corsOptions = {
    origin: true, // Allows all origins
    credentials: true,
  };

  app.use(cors(corsOptions));

  app.set("trust proxy", true);

  const authProvider = new DefaultAuthProvider({
    componentLoader: null,
    authenticate,
  });


  const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || process.env.DATABASE_URL,
    collectionName: 'sessions',
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      provider: authProvider,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret',
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: 'sessionsecret',
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      },
      name: 'adminjs',
    }
  );

  app.use(express.static("./public"));

  productRouter(app);
  app.use(admin.options.rootPath, adminRouter);

  return app;
};

// For local development
if (process.env.NODE_ENV === 'development') {
  createServer().then(app => {
    app.listen(PORT, () => {
      console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
    });
  });
}

// Export for Vercel serverless function
export default async (req, res, next) => {
  const app = await createServer();
  console.log(`Running in ${process.env.NODE_ENV} mode`);
  app(req, res, next);
};
