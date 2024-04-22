import React, { useEffect, useState } from 'react';

import Button from '@src/components/Button.jsx';

// import './QuestDetails.css';

const deleteWarning = 'This will permanently delete this quest from the database. Are you sure?';

export default ({ questList, qIndex, editQuest, completeQuest, deleteQuest }) => {
  const questData = {};
  const quest = (qIndex !== null) ? questList[qIndex] : null;
  let childList = [];

  const [ validParents, setValidParents ] = useState([]);
  const [ editing, setEditing ] = useState(false);
  questData.title = useState();
  questData.notes = useState();
  questData.parent = useState();

  function findAllChildren(questId) {
    let allChildren = questList.filter((q) => {
      return q.parent_id === questId;
    });
    allChildren.forEach((child) => {
      if (child.child_count > 0) {
        allChildren = allChildren.concat(findAllChildren(child.quest_id));
      }
    });
    return allChildren;
  }

  useEffect(() => {
    if (quest !== null) {
      questData.title[1](quest.title);
      questData.notes[1](quest.notes);
      // if there's a parent, pull it's title
      if (!!quest.parent_id) {
        let parent = questList.find(q => q.quest_id === quest.parent_id);
        questData.parent[1](parent);
      }
      // if there are children, populate the list
      if (quest.child_count > 0) {
        childList = findAllChildren(quest.quest_id);
      }
      childList.push(quest);

      let parentList = questList.filter((questObj) => {
        return !childList.includes(questObj);
      });
      setValidParents(parentList);
    } else {
      questData.title[1](null);
      questData.notes[1](null);
      questData.parent[1](null);
    }
  }, [qIndex]);
  
  function handleChange(e, prop) {
    questData[prop][1](e.target.value);
  }  
  
  function toggleEditing() {
    setEditing(!editing);
  }
  
  function cancelEdit() {
    for(let key in questData) {
      questData[key][1](quest[key]);
    }
    toggleEditing();
  }
  
  function sendEdit() {
    debugger;
    const editInfo = {
      quest_id: quest.quest_id,
      title: questData.title[0],
      notes: questData.notes[0],
      parent_id: questData.parent[0].quest_id
    };
    editQuest(editInfo);
    toggleEditing();
  }
  
  function complete() {
    completeQuest(null, qIndex);
  }

  function handleDelete() {    
    if(confirm(deleteWarning)) {
      deleteQuest(qIndex);
    }
  }

  return(
    <>
      <div id="quest-details">
        <div className='quest-focus-container'>
          <h3>Quest:</h3>
          {(editing) ? 
              <input 
                type='text'
                value={questData.title[0]}
                onChange={(e) => handleChange(e, 'title')}
              />
            :
              <p>{questData.title[0]}</p>
           }
          
          <h3>Notes:</h3>
          {(editing) ? 
              <textarea
                onChange={(e) => handleChange(e, 'notes')}
                value={questData.notes[0] || ""}
              /> 
            :
              <p>{questData.notes[0]}</p>
          }

          <h3>Progress:</h3>
          <p></p>

          <h3>Due by:</h3>
          <p></p>

          <h3>Assigned to Quest:</h3>
          {(editing) ? 
              <select
                onChange={(e) => {
                  const targetQuest = questList.find((q) => {
                    return q.quest_id === e.target.value;
                  });
                  let obj = {target: {value: targetQuest}};
                  handleChange(obj, 'parent')
                }}
                value={questData.parent[0]?.quest_id || ''}
              >
                <option value=''>Unassigned</option>
                {validParents?.map((questOpt, i) => {
                  return (
                  <option key={i} value={questOpt.quest_id}>
                    {questOpt.title}
                  </option>
                  )
                })}
              </select>
            :
              <p>{questData.parent[0]?.title}</p>
          }

        </div>
      </div>
      <div id="quest-details-controls">
        <Button 
          onClick={editing ? sendEdit : toggleEditing}
          disabled={quest === null}
        >
          {editing ? 'Save' : 'Edit'}
        </Button>
        {!editing && <button onClick={handleDelete}>Delete</button>}
        <Button 
          onClick={editing ? cancelEdit : complete}
          disabled={quest === null}
        >
          {editing ? 'Cancel' : 'Complete'}
        </Button>        
      </div>
    </>
  );
}