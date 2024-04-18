import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

import CloudUploadIcon from '@src/icons/cloud-upload.svg';
import SaveIcon from '@src/icons/save.svg';

import './ImageUpload.css'

function readDataXfer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(file)
  });
}

export default ({ setImageToUpload }) => {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState(null);

  function handleDragOver(e) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragEnter(e) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave() {
    setDragging(false);
  }

  async function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0]

    console.log(file);
    
    setImageToUpload(file);
    updatePreview(file);
  }

  function handleSelect(e) {
    const file = e.target.files[0];
    setImageToUpload(file);
    updatePreview(file);
  }
  
  function updatePreview(file) {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      setPreview(e.target.result);
    }
    reader.readAsDataURL(file)
  }

  return (
    <Box
      className={dragging ? 'dragging' : ''}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        width: '100%',
        minHeight: '200px',
        border: '2px dashed #090',
        borderRadius: '15px',
        bgcolor: '#00dd0021',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '5px',
        padding: '20px'
      }}
    >
      <input 
        id="profilepic"
        name="profilepic"
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleSelect}
        style={{display: 'none'}}
      />
      {preview && <img className="preview-image" src={preview} alt={`Preview of ${preview.name}`} />}
      <Typography>
        {preview ? 'Drop another image to change your selection, or click Submit to continue' : 'Drag and drop image here or click to select'}
      </Typography>
      <Button 
        variant="contained"
        color="success"
        sx={{width: '80%', color: '#fff', bgcolor: '#293'}}
        startIcon={<SaveIcon/>}
        onClick={() => document.getElementById('profilepic').click()}
      >
         Select Files
      </Button>
    </Box>
  );
};