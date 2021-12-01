import React, { useState } from 'react';

export default ({ save }) => {
  const [profile, setProfile] = useState({
    name: '',
    level: 1,
    xp: 0,
    xpToNextLevel: 100
  });

  function change (e) {
    e.persist();
    setProfile({
      ...profile,
      name: e.target.value
    });
  }

  return (
    <form>
      <h3>Create Profile</h3>
      <input type="text" value={profile.name} onChange={change} placeholder="Enter a name..."/>
      <button onClick={() => {save(profile)}}>Create Profile</button>
    </form>
  )
};