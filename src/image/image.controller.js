import { ObjectId } from "mongodb";
import { downloadWithGridFS } from "../gridfs/downloadWithGridFS.js";
import { uploadWithGridFS } from "../gridfs/uploadWithGridFS.js";
import { deleteWithGridFS } from "../gridfs/deleteWithGridFS.js";

const create = async (req, res) => {
    const file = req?.file;
    const id = req.params.id;
    try {

        let objectId = null;
        if (id && !ObjectId.isValid(id)) objectId = null;
        else {
            objectId = new ObjectId(id);
        }

        if (!file) {
            return res.status(400).json({ error: 'File is required for upload' });
        }

        const fieldId = await uploadWithGridFS(file, { contentType: file.mimetype }, objectId);
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

        const bufferData = await downloadWithGridFS(new ObjectId(id));

        if (!bufferData?.length) return res.status(404).json({ message: "Image not found" });

        res.status(200).json({
            data: bufferData.toString("base64"),
        });

    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

const deleteWithId = async (req, res) => {
    const id = req.params.id;
    try {
        if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Not valid id' });

        const resp = await deleteWithGridFS(new ObjectId(id));

        if (!resp) return res.status(400).json({ error: "Unable to delete" });

        res.status(200).json({
            message: "File deleted with success"
        });

    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

export { create, read, deleteWithId };
