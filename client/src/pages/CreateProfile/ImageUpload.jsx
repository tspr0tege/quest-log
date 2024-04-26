import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

import { ImageUpload as styles } from '@src/styles';
import SaveIcon from '@src/icons/save.svg';

import './ImageUpload.css';

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

    // console.log(file);    
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
      sx={styles.ContainerBox}
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
        sx={UploadButton}
        startIcon={<SaveIcon/>}
        onClick={() => document.getElementById('profilepic').click()}
      >
         Select Files
      </Button>
    </Box>
  );
};