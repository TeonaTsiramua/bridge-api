import AdminJSExpress from "@adminjs/express";
import { DefaultAuthProvider } from "adminjs";
import bcrypt from "bcrypt";
import MongoStore from "connect-mongo";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connect } from "mongoose";
import admin from "../src/index.js";
import { productRouter } from "../src/product/product.router.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const CONNECTION_STRING = process.env.MONGODB_URI || process.env.DATABASE_URL;
const SESSION_COOKIE_MAX_AGE = 1000 * 60 * 60 * 24;

const DEFAULT_ADMIN = {
	email: "admin@example.com",
	passwordHash: bcrypt.hashSync("password", 10), // Securely hash the default password
};

const authenticate = async ({ email, password }) => {
	console.log(`Attempting to authenticate user: ${email}`);
	if (email === DEFAULT_ADMIN.email && bcrypt.compareSync(password, DEFAULT_ADMIN.passwordHash)) {
		console.log("Authentication successful");
		return Promise.resolve(DEFAULT_ADMIN);
	}
	console.log("Authentication failed");
	return null;
};

const createServer = async () => {
	const app = express();

	try {
		await connect(CONNECTION_STRING);

		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("MongoDB connection error:", error);
		process.exit(1); // Exit process if unable to connect to MongoDB
	}

	app.use(express.json());

	const corsOptions = {
		origin: true, // Allows all origins
		credentials: true,
	};

	app.use(cors(corsOptions));
	app.set("trust proxy", true);

	const sessionStore = MongoStore.create({
		mongoUrl: CONNECTION_STRING,
		collectionName: "sessions",
	});

	const authProvider = new DefaultAuthProvider({
		componentLoader: null,
		authenticate,
	});

	const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
		admin,
		{
			cookieName: "adminjs",
			cookiePassword: process.env.SESSION_SECRET || "sessionsecret",
			provider: authProvider,
		},
		null,
		{
			store: sessionStore,
			resave: false,
			saveUninitialized: false,
			secret: process.env.SESSION_SECRET || "sessionsecret",
			cookie: {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: SESSION_COOKIE_MAX_AGE,
			},
			name: "adminjs",
		}
	);

	app.use(express.static("./public"));
	productRouter(app);
	app.use(admin.options.rootPath, adminRouter);

	return app;
};

// For local development
// if (process.env.NODE_ENV === 'development') {
//   createServer().then(app => {
//     app.listen(PORT, () => {
//       console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
//     });
//   }).catch(error => {
//     console.error('Failed to start the server:', error);
//   });
// }

// Export for Vercel serverless function
export default async (req, res, next) => {
	try {
		const app = await createServer();
		console.log(`Running in ${process.env.NODE_ENV} mode`);
		app(req, res, next);
	} catch (error) {
		console.error("Error in serverless function:", error);
		res.status(500).send("Internal Server Error");
	}
};
