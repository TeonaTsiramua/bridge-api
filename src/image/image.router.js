import multer from "multer";
import { create, read, deleteWithId } from './image.controller.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const imageRouter = (app) => {
    app.route("/image-upload/:id").post(upload.single('image'), create);
    app.route("/image/:id").get(read);
    app.route("/image/:id").delete(deleteWithId);
};

export { imageRouter };
