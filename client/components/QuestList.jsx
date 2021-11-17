import React from 'react';

export default ({ quests }) => (
  <ul>
    {quests.map((quest, i) => {
      return <li key={i}>{quest}</li>
    })}
  </ul>
)