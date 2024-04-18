import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';

import { UserContext } from '@src/App';

// import './ProfileSidebar.css';

export default () => {
  const { userProfile } = useContext(UserContext);

  return (
    <Box sx={{bgcolor: 'primary.main', p: '20px', pb: 0}}>
      {!!userProfile &&
        <>
          <Typography component="h3">
            Name
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: { xs: 2, sm: 4 } }}
          >
            {userProfile.name}
          </Typography>
          <Typography component="h3">
            Profile Photo
          </Typography>
          <img 
            style={{
              height: '160px',
              width: '160px',
              objectFit: 'cover'
            }}
            src={userProfile.photo_url} alt="Profile Picture" 
          />
          <Typography component="h3">
            Level
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: { xs: 2, sm: 4 } }}
          >
            {userProfile.level}
          </Typography>
          <Typography component="h3">
            Next Level
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: { xs: 2, sm: 4 } }}
          >
            {userProfile.exp} / {Math.floor(100 * Math.pow(1.1, userProfile.level - 1))}
          </Typography>
        </>
      }
    </Box>
  );
}