import React, { useState } from 'react';
// import axios from 'axios';

const AddPhotoSection = () => {
  const [file, setFile] = useState(null);

  const onDrop = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'secondhandecommerce'); 

    try {
      // const response = await axios.post(
      //   'https://api.cloudinary.com/v1_1/dewdm6hiz/image/upload', 
      //   formData
      // );

      // const imageUrl = response.data.secure_url;
      // console.log(imageUrl);

      // // Save the imageUrl in your database using an API call or other suitable method

      // setFile(null); // Reset the selected file after successful upload
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = () => {
    setFile(null);
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
        <input type="file" onChange={onDrop} accept="image/*" />
      </div>
      <div>
        {file ? (
          <div>
            <img
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              src={URL.createObjectURL(file)}
              alt="Preview"
            />
            <button onClick={handleRemove}>Remove</button>
          </div>
        ) : (
          <div style={addImageTextStyle}>
            <p>Drag and drop an image here, or click to select a file</p>
          </div>
        )}
      </div>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default AddPhotoSection;
