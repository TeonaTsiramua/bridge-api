import multer from "multer";
import { create, read } from './image.controller.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const imageRouter = (app) => {
    app.route("/image-upload").post(upload.single('image'), create);
    app.route("/image/:id").get(read);
};

export { imageRouter };
