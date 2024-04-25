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

    editQuest: async function (index, editInfo) {
      for (const [key, value] of Object.entries(editInfo)) {
        if (key === 'quest_id') continue;
        // Second condition below covers comparing null to ""
        if ((questList[index][key] === value) || (!value && !questList[index][key])) {
          delete editInfo[key];
        }
      }
      if (Object.keys(editInfo).length > 1) {
        const listToLoad = [...questList];
        const updatedQuests = await Quest.edit(editInfo);
        updatedQuests.forEach((updatedQuest) => {
          let indexOfExistingQuest = listToLoad.findIndex((quest) => {
            return quest.quest_id === updatedQuest.quest_id;
          });
          listToLoad[indexOfExistingQuest] = updatedQuest;
        });
        setQuestList(listToLoad);
      } else {
        console.log('No changes made.');
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
 