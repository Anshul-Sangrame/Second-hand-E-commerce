import React, { useState } from 'react';
// import axios from 'axios';

const AddPhotoSection = ({ setFile,disabled }) => {
  const [previewUrl, setPreviewUrl] = useState("");

  const onDrop = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));

  //   // Create a FormData object to store the image file
  //   const formData = new FormData();
  //   formData.append("file", selectedFile);
  //   formData.append("upload_preset", "rqrxlnpn");//this is the upload preset for cloudinary where the image would be stored

  //   try {
  //     // Make a POST request to Cloudinary upload API
  //     const response = await axios.post(
  //       "https://api.cloudinary.com/v1_1/dewdm6hiz/image/upload",
  //       formData
  //     );

  //     // Access the image URL from the response and do something with it
  //     const imageUrl = response.data.secure_url;
  //     console.log("Image uploaded:", imageUrl);
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const addImageTextStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#999',
    cursor: 'pointer',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '10px' }}>
        <input type="file" disabled={disabled} onChange={onDrop} accept="image/*" />
      </div>
      <div>
        {previewUrl ? (
          <div>
            <img
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              src={previewUrl}
              alt="Preview"
            />
            <button onClick={handleRemove}>Remove</button>
          </div>
        ) : (
          <div style={addImageTextStyle}>
            <p>Click to add an image</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default AddPhotoSection;
