import { bundle } from '@adminjs/bundler';
import admin from "./src/index.js";
const componentLoader = admin.componentLoader;

(async () => {
    const files = await bundle({
        componentLoader,
        destinationDir: 'public'
    });
})();