import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import './EditableText.css';

export default ({ content, type, handleFormSubmit }) => {
  
  const [editing, setEditing] = useState(false);
  
  useEffect(() => {
    setEditing(false);
  }, [content])  

  function toggleEditing() {
    setEditing(!editing);
  }

  function runSubmit(e) {
    e.preventDefault();
    handleFormSubmit(e);
    toggleEditing();
  }

  switch (type) {
    case 'title':
      if (editing) {
        return (
          <form className='single-line-form' onSubmit={runSubmit}>
            <input type='text' name='form-field' data-quest-prop={type} defaultValue={content}/>
            <button type='submit' className='icon-btn'>
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </form>
        )
      } else {
        return (
          <div className='editable'>
            <h3>{content}</h3>
            <FontAwesomeIcon icon={faEdit} className='white-icon' onClick={toggleEditing}/>
          </div>
        )
      }
    case 'notes':
      if (editing) {
        return (
          <form className='single-line-form' onSubmit={runSubmit}>
            <textarea name='form-field' data-quest-prop={type} >
              {content}
            </textarea>
            <button type='submit' className='icon-btn'>
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </form>
        )
      } else {
        return (
          <div className='editable'>
            <p>{content}</p>
            <FontAwesomeIcon icon={faEdit} className='white-icon' onClick={toggleEditing}/>
          </div>
        )
      }
    default:
      return (
        <p>{content}</p>
      )
  }
}
