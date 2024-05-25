import { Database, Resource } from "@adminjs/mongoose";
import AdminJS from "adminjs";
import { options } from "./options.js";
import dotenv from 'dotenv';
dotenv.config();

let staticsURL;
// PUBLIC_URL is added in vercel
staticsURL = process.env.PUBLIC_URL ? ("https://" + process.env.PUBLIC_URL) : `http://localhost:${process.env.PORT}`;
staticsURL = new URL("/", staticsURL).href;  // ./public folder is made static and all files inside will be available at `${baseURL}/`

AdminJS.registerAdapter({
    Resource: Resource,
    Database: Database,
});

const admin = new AdminJS({
    ...options, assetsCDN: staticsURL, branding: {
        companyName: "Bridge",
        favicon: `${staticsURL}/logo.svg`
    }
});

export default admin;