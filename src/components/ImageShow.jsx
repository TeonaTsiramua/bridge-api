import { Box, Label } from "@adminjs/design-system";
import React, { useEffect, useState } from "react";

const ImageShow = ({ record }) => {
	const [image, setImage] = useState({});

	useEffect(() => {
		const getImage = async (id) => {
			const data = await fetch(`/image/${id}`).then((res) => res.json());

			console.log(data);

			setImage({ ...data, data: `data:${data.contentType};base64,${data.data}` });
		};
		if (record?.params?._id) {
			getImage(record.params._id);
		}
	}, [record?.params?._id]);
	return (
		<Box>
			<img src={image?.data} alt="Image" style={{ maxWidth: 120 }} />
		</Box>
	);
};

export default ImageShow;
