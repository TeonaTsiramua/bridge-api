import { Box as Container, DropZone } from "@adminjs/design-system";
import { Box, CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

const setFieldsToLocalStorage = (id, bucketId) => {
	window.localStorage.setItem(id, JSON.stringify({ bucketId }));
};
const getFieldsFromStorage = (id) => {
	const val = window.localStorage.getItem(id);
	return val ? JSON.parse(val) : null;
};

const ImageUploader = ({ onChange, record, property }) => {
	const [loading, setLoading] = useState(false);
	const [id, setId] = useState("");
	const [image, setImage] = useState(null);

	const handleUpload = useCallback(
		async (files) => {
			const [file] = files;
			if (file) {
				setImage(file);
				setLoading(true);
				onChange("name", "");
				onChange("contentType", "");
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
					setFieldsToLocalStorage(property.name, res.id);
					setId(res.id);
					onChange("name", file.name);
					onChange("contentType", file.type);
					onChange("bucketId", res.id);
				}
				setLoading(false);
			} else {
				setImage(null);
			}
		},
		[onChange]
	);

	useEffect(() => {
		const deleteWithId = async (id) => {
			setLoading(true);
			await fetch(`/image/${id}`, {
				method: "DELETE",
			});
			localStorage.removeItem(property.name);
			onChange("name", "");
			onChange("contentType", "");
			onChange("bucketId", "");
			setLoading(false);
		};

		if (id && !image) {
			deleteWithId(id);
		}
	}, [id, image]);

	useEffect(() => {
		if (property.name) {
			const val = getFieldsFromStorage(property.name);
			if (val) {
				setId(val.bucketId);
			}
		}

		return () => window.localStorage.removeItem(property.name);
	}, [property.name]);

	return (
		<Container>
			<DropZone
				validate={{
					mimeTypes: ["image/jpeg", "image/png"],
				}}
				onChange={(files) => handleUpload(files)}
			/>
			<Box style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
				{loading && <CircularProgress size={30} />}
			</Box>
		</Container>
	);
};

export default ImageUploader;
