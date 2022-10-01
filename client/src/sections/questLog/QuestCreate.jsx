import React from 'react';

import FramedTextBox from '../../components/FramedTextBox.jsx';
import './QuestCreate.css';

export default ({handleClick}) => (
  <form id="new-task-bar">
    {/* <input type="text" name="title" placeholder="Enter a new task"/> */}
    <FramedTextBox name="title" placeholder="Enter a new task" />
    <button id="create-btn" onClick={handleClick}>Add</button>
  </form>
);