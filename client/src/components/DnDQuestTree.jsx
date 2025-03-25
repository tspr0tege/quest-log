import React, { createContext, useRef, useState } from 'react';

import DnDQuestList from '@src/components/DnDQuestList';
import QuestListContext from '@src/components/QuestListContext';
import './DnDQuestTree.css'

export default ({ data }) => {
  const timeoutRef = useRef(null);
  const insertBeforeID = useRef(null);
  const newParentID = useRef(null);
  const [questList, setQuestList] = useState(data);
  const [pageOne, setPageOne] = useState(
    Object.keys(questList).filter((questID) => {
      return questList[questID].parent_id === null;
    })
  );

  const reparentQuest = (questToMoveID, newParentID) => {

  }

  let lastMouseY = null;
  const findListPosition = (mouseY, targetList) => {
    for (let i = 0; i < targetList.length; i++) {
      const child = targetList[i];
      const itemBox = child.getBoundingClientRect();

      if (mouseY < itemBox.top) {
        return child.dataset.id;
      }
    }
    return null;
  }


  const olHandleDragEnter = (event) => {
    const olElement = event.target;
    const liElements = olElement.querySelectorAll(':scope > li');
    const mouseY = event.clientY;
    
    if (lastMouseY === null || Math.abs(lastMouseY - mouseY) > 5) {
      lastMouseY = mouseY;
      const targetInsertID = findListPosition(mouseY, liElements);
      // console.log(targetInsertID);
      insertBeforeID.current = targetInsertID;
      newParentID.current = olElement.dataset.parentId;
    }
  }

  const liHandleDragEnter = () => {}

  const liHandleDragEnd = (targetId) => {
    console.log("Dropping: ", targetId);

    // Reset ol gaps
    const expandedOlElements = document.querySelectorAll('#quest-tree ol.expanded');
    expandedOlElements.forEach((ol) => {ol.classList.remove('expanded')});

    if (targetId === newParentID.current) {
      insertBeforeID.current = null;
      newParentID.current = null;
      return
    }

    // References for all possible changes
    const targetQuestCopy = JSON.stringify(questList[targetId]);
    const targetQuest = JSON.parse(targetQuestCopy);
    const pageOneCopy = [...pageOne];
    const pageOneCopyCheck = JSON.stringify(pageOneCopy);
    let oldParent = null;
    let newParent = null;

    // Remove from old list
    if (targetQuest.parent_id === null) {
      const targetIndex = pageOneCopy.findIndex((id) => id == targetId);
      pageOneCopy.splice(targetIndex, 1);
    } else {
      const oldParentID = questList[targetId].parent_id;
      oldParent = JSON.parse(JSON.stringify(questList[oldParentID]));
      const targetIndex = oldParent.child_ids.findIndex((id) => id == targetId);
      oldParent.child_ids.splice(targetIndex, 1);
    }

    targetQuest.parent_id = !!newParentID.current ? newParentID.current : null;

    // Add to new list
    if (!newParentID.current) {
      if (!insertBeforeID.current){
        pageOneCopy.push(targetId)
      } else {
        const targetIndex = pageOneCopy.findIndex((id) => id == insertBeforeID.current);
        pageOneCopy.splice(targetIndex, 0, targetId);
      }
    } else {
      newParent = JSON.parse(JSON.stringify(questList[newParentID.current]));
      if (!insertBeforeID.current) {
        newParent.child_ids.push(targetId);
      } else {
        const targetIndex = newParent.child_ids.findIndex((id) => id == insertBeforeID.current);
        newParent.child_ids.splice(targetIndex, 0, targetId);
      }
    }

    let questListCopy = {}

    if (targetQuestCopy !== JSON.stringify(targetQuest)) {
      questListCopy[targetQuest.quest_id] = targetQuest;
    }

    if (newParent !== null) {
      questListCopy[newParent.quest_id] = newParent;
    }

    if (oldParent !== null) {
      questListCopy[oldParent.quest_id] = oldParent;
    }

    if (Object.keys(questListCopy).length > 0) {
      questListCopy = {...questList, ...questListCopy};
      setQuestList(questListCopy);
    }

    if (pageOneCopyCheck !== JSON.stringify(pageOneCopy)) {
      setPageOne(pageOneCopy);
    }

    insertBeforeID.current = null;
    newParentID.current = null;
  }

  return (
    <QuestListContext
      questList={questList} 
      reparentQuest={reparentQuest}
      timeoutRef={timeoutRef}
      olHandleDragEnter={olHandleDragEnter}
      liHandleDragEnter={liHandleDragEnter}
      liHandleDragEnd={liHandleDragEnd}
    >
      <section id='quest-tree'>
        <DnDQuestList questIDlist={pageOne} tree={true} >
        </DnDQuestList>
      </section>
    </QuestListContext>
  );
}