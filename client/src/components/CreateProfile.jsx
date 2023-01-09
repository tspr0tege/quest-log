import React, { useRef, useContext } from 'react';

import { Context } from '@src/App';

import Profile from '@API/profile';

import './CreateProfile.css';

export default ({ close }) => {
  const { user } = useContext(Context);
  const fileInput = useRef();

  async function processForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('profile_id', user);
    const createRes = await Profile.create(formData);
    console.log(createRes);
    close();
  }

  return (
    <div id="create-account">
      <h2>Create Your Profile</h2>
      <Form processForm={processForm} fileInput={fileInput}/>      
    </div>
  );
}

const Form = ({ processForm, fileInput }) => (
  <form onSubmit={processForm} encType="multipart/form-data">
    <label htmlFor="username">Display Name:</label>
    <input type="text" id="username" name="username" required/>
    <label htmlFor="profilepic">Profile Picture:</label>
    <input ref={fileInput} type="file" id="profilepic" name="profilepic"/>
    <button type="submit">Submit</button>
  </form>
)