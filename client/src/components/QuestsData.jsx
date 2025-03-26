import React, { createContext, useState, useEffect, useContext } from 'react';

import Quest from '@API/quests'
import { UserContext } from '@src/App';

export const QuestContext = createContext();

export default ({ children }) => {
  const { userProfile: { profile_id: user }, updateProfile } = useContext(UserContext);
  const [ questList, setQuestList ] = useState(null);

  useEffect(() => {
    async function getQuestData() {
      const newList = {}, getList = await Quest.get(null, user);
      // for (let obj in getList) {
      //   // newList.push(getList[obj]);
      //   console.log(JSON.stringify(obj))
      // }
      getList.forEach((obj) => {
          newList[obj.quest_id] = obj
      })
      // console.log(`newList: ${JSON.stringify(newList)}`, `getList: ${JSON.stringify(getList)}`)
      setQuestList(newList);
    }
    if (questList === null) {
      getQuestData();
    }
  });

  const controller = {

    createQuest: async function (newQuestInfo) {
      // e.preventDefault();
      // const { form } = e.target;/
      let newQuest = await Quest.create(newQuestInfo, user);
      // form.title.value = '';
      console.log(newQuest);
      const newQuestList = {...questList};
      newQuestList[newQuest.quest_id] = newQuest;
      setQuestList(newQuestList);
    },

    editQuest: async function (editInfo) {
      for (const [key, value] of Object.entries(editInfo)) {
        if (key === 'quest_id') continue;
        // Second condition below covers comparing null to ""
        if ((questList[index][key] === value) || (!value && !questList[index][key])) {
          delete editInfo[key];
        }
      }
      if (Object.keys(editInfo).length > 1) {
        const listToLoad = {...questList};
        const updatedQuests = await Quest.edit(editInfo);
        updatedQuests.forEach((updatedQuest) => {
          listToLoad[updatedQuest.quest_id] = updatedQuest;
        });
        setQuestList(listToLoad);
      } else {
        console.log('No changes made.');
      }
    },

    completeQuest: async function (quest_id) {    
      const response = await Quest.complete(quest_id, user);
  
      // response object will contain profile fields that have been updated
      if (!!response?.exp) {
        removeFromQuestlist(quest_id);
        updateProfile(response);    
      }    
    },

    deleteQuest: function (quest_id) {
      // IMPORTANT: delete needs to check for children and 
      // cancel operation or delete everything
      Quest.delete(quest_id);
      removeFromQuestlist(quest_id);
    }
  } 

  function removeFromQuestlist(quest_id) {
    const newList = {...questList};
    delete newList[quest_id]
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
 