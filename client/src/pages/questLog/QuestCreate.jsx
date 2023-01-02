import React from 'react';

// import TextInput from '@src/components/TextInput.jsx';
import Button from '@src/components/Button.jsx'
import './QuestCreate.css';

export default ({handleClick}) => (
  <form id="new-task-bar">
    {/* <input type="text" name="title" placeholder="Enter a new task"/> */}
    <TextInput/>
    <Button id="create-btn" onClick={handleClick}>
      Add
    </Button>
  </form>
);

const TextInput = () => (
  <input
    type="text" 
    name="title"
    placeholder="Enter a new task"
    style={{flexGrow: 1}}
  />
)