import React, { createContext, useState, useEffect, useContext } from 'react';

import Quest from '@API/quests'
import { UserContext } from '@src/App';

export const QuestContext = createContext();

export default ({ children }) => {
  const { userProfile: { profile_id: user }, updateProfile } = useContext(UserContext);
  const [ questList, setQuestList ] = useState(null);

  useEffect(async () => {
    if (questList === null) {
      const newList = [], getList = await Quest.get(null, user);
      for (let obj in getList) {
        newList.push(getList[obj]);
      }
      setQuestList(newList);
    }
  });

  const controller = {
    createQuest: async function (e) {
      e.preventDefault();
      const { form } = e.target;
      let newQuest = await Quest.create({
        title: form.title.value
      }, user);
      form.title.value = '';
      setQuestList([...questList, newQuest]);
    },
    editQuest: function (index, editInfo) {
      // const editInfo = {
      //   quest_id: quest.quest_id,
      //   title: questData.title[0],
      //   notes: questData.notes[0],
      //   parent_id: questData.parent[0].quest_id
      // };
      for (const [key, value] of Object.entries(editInfo)) {
        if (key === 'quest_id') continue;
        
        if (questList[index][key] === value) {
          delete editInfo[key];
        }
      }
    },
    completeQuest: async function (index) {    
      const response = await Quest.complete(questList[index].quest_id, user);
  
      // response object will contain profile fields that have been updated
      if (!!response?.exp) {
        removeFromQuestlist(index);
        updateProfile(response);    
      }    
    },
    deleteQuest: function (index) {
      // IMPORTANT: delete needs to check for children and 
      // cancel operation or delete everything
      Quest.delete(questList[index].quest_id);
      removeFromQuestlist(index);
    }
  } 

  function removeFromQuestlist(index) {
    const newList = [...questList];
    newList.splice(index, 1);
    setQuestList(newList);
  }

  return (
    <QuestContext.Provider
      value={{ 
        questList,
        controller
      }}
    >
      {children}
    </QuestContext.Provider>
  );

}

// export { QuestContext };
 