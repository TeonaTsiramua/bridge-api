import AdminJSExpress from '@adminjs/express';
import dotenv from 'dotenv';
import express from 'express';
import { connect } from 'mongoose';
import admin from '../src/index.js';
import { productRouter } from '../src/product/product.router.js';
import cors from 'cors';
import { DefaultAuthProvider } from 'adminjs';

dotenv.config();

const PORT = process.env.PORT || 3000;

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async ({ email, password }, ctx) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

const createServer = async () => {
  const app = express();
  try {
    await connect(process.env.MONGODB_URI || process.env.DATABASE_URL);
  } catch (error) {
    console.log(error);
  }

  app.use(express.json());

  const corsOptions = {
    origin: true, // Allows all origins
    credentials: true,
  };

  app.use(cors(corsOptions));

  const authProvider = new DefaultAuthProvider({
    componentLoader: null,
    authenticate,
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: 'sessionsecret',
      provider: authProvider
    },
    null,
    {
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: "auto",
        httpOnly: true,
        sameSite: 'none'
      },
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
  app(req, res, next);
};
