import React, { useContext, useState } from 'react';

import { Context } from './App.jsx';

import QuestEditForm from './QuestEditForm.jsx';

export default ({ quest }) => {
  const { editQuest } = useContext(Context);

  const processChanges = (e) => {
    e.preventDefault();
    const { title, description } = e.target.form;
    const options = { 
      title: title.value, 
      description: description.value
    };
    editQuest(quest, options);
  }

  return (
    <QuestEditForm quest={quest} submit={processChanges}/>
  );
}
