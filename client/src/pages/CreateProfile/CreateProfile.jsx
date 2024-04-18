import React, { useContext, useState } from 'react';
import { Button, Box, Grid, Paper, TextField, Typography } from '@mui/material';

import { CreateProfile as styles } from '@src/styles';
import { UserContext } from '@src/App';

import Profile from '@API/profile';
import ImageUpload from './ImageUpload';

export default () => {
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

    // for (const [ key, value ] of profileFormData.entries()) {
    //   console.log(key, value);
    // }

    const createRes = await Profile.create(profileFormData);
    // console.log(createRes);
  }

  return (
    <Grid container sx={styles.GridContainer}>
      <Grid 
        item
        square
        elevation={6}
        component={Paper}
        xs={12} sm={8} md={5}
        sx={styles.InnerGrid}
      >
        <Typography component="h2" variant="h3" sx={{mb: '40px'}}>
          Create Your Profile
        </Typography>
        <Box 
          component="form"
          onSubmit={processForm}
          encType="multipart/form-data"
          sx={styles.ProfileForm}
        >
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
