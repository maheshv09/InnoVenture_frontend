import React, { useState } from "react";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const cloudName = "dopyurni4";
  const uploadPreset = "ml_default";
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    // Replace with your Cloudinary cloud name
    // Replace with your Cloudinary upload preset

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dopyurni4/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <CloudinaryContext cloudName={cloudName}>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      {imageUrl ? imageUrl : <></>}
    </CloudinaryContext>
  );
};

export default FileUpload;

//export default FileUpload;
// dopyurni4
// ml_default
