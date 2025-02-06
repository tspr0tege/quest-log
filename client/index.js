import React from 'react';
import { render } from 'react-dom';

import App from './src/App.jsx';

// render(<App />, document.getElementById('app'));

import { useState, useRef, memo } from 'react';

const ChildList = memo(({ children, dragOver }) => {
  console.log("Rendering ChildList")
  return (
    <ol 
        style={{ 
          padding: '1em',
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }} 
        onDragOver={dragOver}
      >
        {children}
      </ol>
  );
})

const DraggableList = ({ listItems }) => {
  const dropIndicatorRef = useRef(null);
  // const indicatorHome = useRef(null);

  const [list, setList] = useState(listItems);
  // const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  // const [dropIndex, setDropIndex] = useState(null);
  const draggedItemIndex = useRef(null);
  const dropIndex = useRef(null);

  // onDrag, onDrop, onDragOver, onDragStart, onDragEnd, onDragEnter, onDragLeave

  function pickupListItem(event, index) {
    const olContainer = event.currentTarget.parentElement; // Create closure for element

    console.log("picking up index: ", index)
    dropIndex.current = index;
    draggedItemIndex.current = index;
    dropIndicatorRef.current.style.display = 'block';

    setTimeout(() => { // handle DOM manipulation in setTimeout - this is a BUG in Chrome?
      olContainer.style.gap = '1em';
    }, 0);
  }

  function dropListItem(event) {
    console.log("dropping")

    const newList = [...list];
    console.log('Drop index: ', dropIndex.current);
    // returnIndicator();
    dropIndicatorRef.current.parentElement?.removeChild(dropIndicatorRef.current);
    newList.splice(draggedItemIndex.current, 1);
    newList.splice(dropIndex.current, 0, list[draggedItemIndex.current]);
    draggedItemIndex.current = null;
    dropIndex.current = null;
    setList(newList);
    event.currentTarget.parentElement.style.gap = '4px';
  }

  let lastMouseY = null;

  function handleDraggingToPosition(e) { // process context is ol
    e.preventDefault();
    console.log("dragging")
    const mouseY = e.clientY;
    const targetList = e.currentTarget.querySelectorAll(':scope > li');

    if (lastMouseY === null || Math.abs(lastMouseY - mouseY) > 5) {
      lastMouseY = mouseY;
      const targetIndex = findListPosition(mouseY, targetList);
      // console.log(targetIndex);
      dropIndex.current = targetIndex;
    }
  }

  function returnIndicator() {
    dropIndicatorRef.current.style.display = 'none';
    indicatorHome.current.appendChild(dropIndicatorRef.current);
  }

  function findListPosition(mouseY, targetList) {
    for (let i = 0; i < targetList.length; i++) {
      const child = targetList[i];
      const itemBox = child.getBoundingClientRect();

      if (mouseY < itemBox.top) {
        child.insertAdjacentElement('beforebegin', dropIndicatorRef.current);
        return (draggedItemIndex.current < i) ? i - 1 : i;
      }
    }
    targetList[targetList.length - 1].insertAdjacentElement('afterend', dropIndicatorRef.current);
    return targetList.length - 1;
  }

  return (
    <>
      <ChildList dragOver={handleDraggingToPosition}>
        {list.map((listItem, index) => (
          <li
            key={index}
            draggable
            style={{ border: '1px solid', padding: '8px' }}
            onDragStart={(e) => { pickupListItem(e, index) }}
            onDragEnd={(e) => { dropListItem(e) }}
          >
            {listItem.title}
          </li>
        ))}
      </ChildList>
      {/* <div ref={indicatorHome}> */}
        <div
          ref={dropIndicatorRef}
          style={{
            height: '2em',
            backgroundColor: '#0003',
            margin: '4px 0',
            display: 'none',
          }}
        />
      {/* </div> */}

    </>
  );
}


const DragAndDropContainer = () => {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  const newItems = [
    {
      title: 'Item 1',
      children: []
    },
    {
      title: 'Item 2',
      children: [
        {
          title: 'Item 7',
          children: []
        },
      ]
    },
    {
      title: 'Item 3',
      children: []
    },
    {
      title: 'Item 4',
      children: [
        {
          title: 'Item 6',
          children: []
        },
      ]
    },
    {
      title: 'Item 5',
      children: []
    },
    {
      title: 'Item 8',
      children: []
    },
  ];

  return <DraggableList listItems={newItems} />;  
}

render(<DragAndDropContainer/>, document.getElementById('app'));
