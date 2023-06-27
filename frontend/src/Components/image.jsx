
import React, { useState } from 'react';
import axios from 'axios';

const AddPhotoSection = () => {
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData);
      console.log(response.data);
      setFile(null); // Reset the selected file after successful upload
    } catch (error) {
      console.error(error);
    }
  };

  const dropzoneStyle = {
    border: '2px dashed #ccc',
    borderRadius: '5px',
    padding: '20px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    outline: 'none',
  };

  const addImageTextStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#999',
  };

  const uploadButtonStyle = {
    marginTop: '10px',
    backgroundColor: '#f0f0f0',
    color: '#666',
    padding: '8px 20px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={dropzoneStyle}
        onDrop={onDrop}
        accept="image/*"
      >
        <div style={{ width: '100%', height: '100%' }}>
          {file ? (
            <img
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              src={URL.createObjectURL(file)}
              alt="Preview"
            />
          ) : (
            <div style={addImageTextStyle}>
              <p>Drag and drop an image here, or click to select a file</p>
            </div>
          )}
        </div>
      </div>
      <button style={uploadButtonStyle} onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default AddPhotoSection;
