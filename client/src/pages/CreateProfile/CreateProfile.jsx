import React, { useRef, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Box, Grid, Paper, TextField, Typography } from '@mui/material';

import { UserContext } from '@src/App';

import Profile from '@API/profile';

// import './CreateProfile.css';

export default () => {
  const fileInput = useRef();
  const { logout } = useAuth0();
  const { auth0UserID } = useContext(UserContext);

  async function processForm(e) {
    e.preventDefault();
    const profileFormData = new FormData(e.target);
    profileFormData.append('profile_id', auth0UserID);

    const createRes = await Profile.create(profileFormData);
    // console.log({
    //   username: profileFormData.get('username'),
    //   profile_id: profileFormData.get('profile_id')
    // });
    console.log(createRes);
  }

  // After submitted user data and getting an affirmative response

  return (
    <Grid container sx={{height: '100vh', margin: 'auto'}}>
      <Button onClick={logout} variant="contained" size="large">LOGOUT</Button>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Typography component="h1" variant="h2">
          Create Your Profile
        </Typography>
        <Box component="form" onSubmit={processForm} encType="multipart/form-data">
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Display Name"
            name="username"
            // autoComplete="email"
            autoFocus
          />

          <label htmlFor="profilepic">Profile Picture:</label>
          <input ref={fileInput} type="file" id="profilepic" name="profilepic"/>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

// const Form = ({ processForm, fileInput }) => (
// )