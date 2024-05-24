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

  const oneDay = 1000 * 60 * 60 * 24;
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
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production",
        maxAge: oneDay,
        domain: process.env.NODE_ENV === "production" ? '.bridgetrade.ge' : undefined
      },
    }
  );

  // Middleware to log requests and responses
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    const originalSend = res.send;
    res.send = function (body) {
      console.log(`Response status: ${res.statusCode}`);
      originalSend.call(this, body);
    };
    next();
  });

  // Additional middleware to capture redirects
  app.use((req, res, next) => {
    res.on('finish', () => {
      if (res.statusCode === 307) {
        console.log(`Redirect detected: ${req.method} ${req.url} to ${res.get('Location')}`);
      }
    });
    next();
  });

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
