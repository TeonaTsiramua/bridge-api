import { Schema, model } from "mongoose";

const fileSchema = new Schema(
	{
		s3Key: {
			type: [String],
			required: false,
		},
		bucket: {
			type: [String],
			required: false,
		},
		mime: {
			type: [String],
			required: false,
		},
	},
	{
		timestamps: {
			createdAt: "createdAt",
			updatedAt: "updatedAt",
		},
	}
);

const File = model("File", fileSchema);

export { File, fileSchema };
