import AdminJSExpress from '@adminjs/express';
import dotenv from 'dotenv';
import express from 'express';
import { connect } from 'mongoose';
import admin from '../src/index.js';
import session from "express-session";
import { productRouter } from '../src/product/product.router.js';
import MongoStore from "connect-mongo";

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

const createServer = async () => {
  const app = express();
  try {
    await connect(process.env.MONGODB_URI || process.env.DATABASE_URL);
  } catch (error) {
    console.log(error); 
  }

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'admin-cookie',
      cookiePassword: 'sessionsecret',
    },
    null,
    {
      resave: true,
      saveUninitialized: true,
      cookie: {
        secure: false,
        httpOnly: true,
        sameSite: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      },
    }
  );

  app.use(express.json());
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
export default async (req, res) => {
  const app = await createServer();
  app(req, res);
};
