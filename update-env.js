import fs from 'fs';

import dotenv from 'dotenv';

import packageJson from './package.json' assert { type: 'json' };

// Load existing .env file
const envConfig = dotenv.parse(fs.readFileSync('.env.prod'));

// Update the version in the .env file
envConfig.PACKAGE_VERSION = packageJson.version;

// Convert the updated config back to the .env format
const updatedEnv = Object.entries(envConfig)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

// Write the updated .env file
fs.writeFileSync('.env.prod', updatedEnv);

console.log(`.env file updated with VERSION=${packageJson.version}`);
