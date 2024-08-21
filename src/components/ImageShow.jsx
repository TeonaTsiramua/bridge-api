import { Box } from "@adminjs/design-system";
import React, { useEffect, useState } from "react";

const ImageShow = ({ record, property }) => {
	const [image, setImage] = useState({});

	useEffect(() => {
		const getImage = async (id) => {
			const data = await fetch(`/image/${id}`).then((res) => res.json());

			console.log(data);

			setImage({ ...data, data: `data:${data.contentType};base64,${data.data}` });
		};
		if (record.params?.bucketId) {
			getImage(record.params.bucketId);
		}
	}, [record, property.name]);
	return (
		<Box>
			<img src={image?.data} alt="Image" style={{ maxWidth: 120 }} />
		</Box>
	);
};

export default ImageShow;
