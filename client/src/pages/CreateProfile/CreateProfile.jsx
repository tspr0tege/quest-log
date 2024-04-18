import React, { useRef, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Box, Grid, Paper, TextField, Typography } from '@mui/material';

import { UserContext } from '@src/App';

import Profile from '@API/profile';
import ImageUpload from './ImageUpload';

// import './CreateProfile.css';

export default () => {
  // const fileInput = useRef();
  const { logout } = useAuth0();
  const { auth0UserID } = useContext(UserContext);
  const [ newFormData, setNewFormData ] = useState(null);

  function setImageToUpload(imageFile) {
    const resetForm = new FormData();
    resetForm.append('profilepic', imageFile);
    setNewFormData(resetForm);
  }

  async function processForm(e) {
    e.preventDefault();
    const profileFormData = newFormData;
    profileFormData.append('username', e.target.username.value);
    profileFormData.append('profile_id', auth0UserID);
    // profileFormData.append('profilepic', imageToUpload);
    // console.log(imageToUpload);

    for (const [ key, value ] of profileFormData.entries()) {
      console.log(key, value);
    }
    // console.log({
    //   username: profileFormData.get('username'),
    //   profile_id: profileFormData.get('profile_id'),
    //   profilepic: profileFormData.profilepic
    // });

    const createRes = await Profile.create(profileFormData);
    console.log(createRes);
  }

  return (
    <Grid container sx={{height: '100vh', pt: '48px'}}>
      {/* <Button onClick={logout} variant="contained" size="large">LOGOUT</Button> */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
        sx={{
          margin: 'auto',
          padding: '40px',
        }}
      >
        <Typography component="h2" variant="h3" sx={{mb: '40px'}}>
          Create Your Profile
        </Typography>
        <Box component="form" onSubmit={processForm} encType="multipart/form-data" sx={{display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center'}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            name="username"
            label="Display Name"
            // autoComplete="email"
            autoFocus
          />

          <ImageUpload setImageToUpload={setImageToUpload} />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}
