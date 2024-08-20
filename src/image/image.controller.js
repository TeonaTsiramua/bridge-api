import { ObjectId } from "mongodb";
import { downloadWithGridFS } from "../gridfs/downloadWithGridFS.js";
import { uploadWithGridFS } from "../gridfs/uploadWithGridFS.js";
import { Image } from "./image.entity.js";

const create = async (req, res) => {
    const file = req?.file;
    try {
        if (!file) {
            return res.status(400).json({ error: 'File is required for upload' });
        }

        const fieldId = await uploadWithGridFS(file, { contentType: file.mimetype });
        res.json({ message: 'File uploaded successfully!', id: fieldId });
    } catch (error) {
        console.error('Unexpected error during upload:', error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};


const read = async (req, res) => {

    const id = req.params.id;
    try {
        if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Not valid id' });

        const image = await Image.findById(id).lean();

        if (!image) return res.status(404).json({ error: 'Image not found' });

        const bufferData = await downloadWithGridFS(new ObjectId(image.bucketId));

        if (!bufferData?.length) return res.status(404).json({ message: "Image not found" });

        res.status(200).json({
            id: image._id.toString(),
            name: image.name,
            contentType: image.contentType,
            data: bufferData.toString("base64"),
            bucketId: image.bucketId
        });

    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

export { create, read };
