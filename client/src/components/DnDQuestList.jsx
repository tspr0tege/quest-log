import React, { useContext } from 'react';

import { QuestListContext } from '@src/components/QuestListContext';
import DraggableQuestItem from '@src/components/DraggableQuestItem';


export default ({ questIDlist, tree=false, parentID=null }) => {
  const context = useContext(QuestListContext);
  const listExists = !!questIDlist?.length;

  const handleDragEnter = (event) => {
    event.stopPropagation();
    clearTimeout(context.timeoutRef.current);

    const eventClosure = {...event};

    context.timeoutRef.current = setTimeout(() => {
      eventClosure.currentTarget.classList.add('expanded');
      context.olHandleDragEnter(event);
    }, 400);
  }

  return (
    <ol
      style={{
        marginTop: listExists ? '.5em' : '0',
      }}
      onDragEnter={handleDragEnter}
      data-parent-id={parentID}
    >
      {listExists && questIDlist.map((id, index) => {
        return <DraggableQuestItem key={index} tree={tree} questData={context.questList[id]} />
      })}
    </ol>
  );
}
