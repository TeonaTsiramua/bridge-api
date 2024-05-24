import AdminJSExpress from '@adminjs/express';
import dotenv from 'dotenv';
import express from 'express';
import { connect } from 'mongoose';
import admin from '../src/index.js';
import { productRouter } from '../src/product/product.router.js';
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

const start = async () => {
  const app = express();
  // await connect(process.env.MONGODB_URI || process.env.DATABASE_URL);

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret',
    },
    null,
    {
      resave: true,
      saveUninitialized: true,
      secret: 'sessionsecret',
      name: 'adminjs',
    }
  );

  app.use(express.json());

  app.use(express.static("./public"));

  productRouter(app);

  app.use(admin.options.rootPath, adminRouter);

  // app.listen(PORT, () => {
  //   console.log(
  //     `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
  //   );
  // });
};

// process.env.NODE_ENV === "development" && start();

export default start;
