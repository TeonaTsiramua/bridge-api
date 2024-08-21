import { Box, DropZone } from "@adminjs/design-system";
import React, { useCallback } from "react";

const ImageUploader = ({ onChange, record }) => {
	const handleUpload = useCallback(
		async (files) => {
			onChange("name", "");
			onChange("contentType", "");
			const [file] = files;
			const formData = new FormData();
			formData.append("image", file);

			let id = "";

			if (record.params?.bucketId) {
				id = record.params.bucketId;
			}

			const res = await fetch("/image-upload" + (id ? `/${id}` : "/010"), {
				method: "POST",
				body: formData,
			}).then((res) => res.json());

			if (res.id) {
				onChange("name", file.name);
				onChange("contentType", file.type);
				onChange("bucketId", res.id);
			}
		},
		[onChange]
	);
	return (
		<Box>
			<DropZone
				validate={{
					mimeTypes: ["image/jpeg", "image/png"],
				}}
				onChange={(files) => handleUpload(files)}
			/>
		</Box>
	);
};

export default ImageUploader;
