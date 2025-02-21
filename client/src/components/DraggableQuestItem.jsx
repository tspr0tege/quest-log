import React, { useContext } from 'react';
import { QuestListContext } from '@src/components/QuestListContext';

import DnDQuestList from '@src/components/DnDQuestList';

export default ({ questData, tree }) => {
  const context = useContext(QuestListContext);

  const handleDragStart = (event) => {
    event.stopPropagation();
  }

  const handleDragEnd = (event) => {
    event.stopPropagation();
    context.liHandleDragEnd(questData.quest_id);
  }

  const handleDragEnter = (event) => {
    event.stopPropagation();
    if (tree) {
      // Do tree stuff
      clearTimeout(context.timeoutRef.current);

      const liElement = event.currentTarget;
      const childList = liElement.querySelector(':scope > ol');
      
      context.timeoutRef.current = setTimeout(() => {
        console.log('Expanding li');
        childList.classList.add('expanded');
      }, 400);
    }
  }

  return (
    <li 
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragEnter={handleDragEnter}
      data-id={questData.quest_id}
    >
      {questData.title}
      {tree && <DnDQuestList questIDlist={questData?.child_ids} parentID={questData?.quest_id} tree={tree} />}
    </li>
  );
}