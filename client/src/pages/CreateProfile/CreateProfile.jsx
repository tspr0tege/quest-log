import React, { useContext, useState } from 'react';
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
    <div className="grid-container">
      <div className='inner-grid' >
        <h3 style={{marginBottom: '40px'}}>
          Create Your Profile
        </h3>
        <form
          onSubmit={processForm}
          encType="multipart/form-data"
          className='profile-form'
        >
          <input
            type="text"
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
          <button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
