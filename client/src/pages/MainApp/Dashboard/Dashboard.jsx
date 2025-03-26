import React, { useEffect, useState, useContext } from 'react';

import { QuestContext } from '@src/components/QuestsData';
import OptionsButton from './OptionsButton';
import NewQuestButton from '@src/components/NewQuestButton';

import './Dashboard.css';

export default () => {
  const { questList, controller } = useContext(QuestContext);
  const [ targetIndex, setTargetIndex ] = useState(0);
  const [ questsLoaded, setQuestsLoaded ] = useState(false);

  useEffect(() => {
    if (!questsLoaded && questList) {
      setQuestsLoaded(true);
    }    
  }, [questList]);

  function handleOptionsSelection(optionSelection) {
    switch(optionSelection) {
      case 'Delete':
        controller.deleteQuest(targetIndex);
        if (targetIndex >= questList.length -1) {
          setTargetIndex(0);
        }
        break;
      case 'Stash':
        console.log("Send task back to the vault.");
        break;
      case 'Skip':
        if (targetIndex + 1 >= questList.length) {
          setTargetIndex(0);
        } else {
          setTargetIndex(targetIndex + 1);
        }
        break;
      case 'Edit':
        break;
      default:
        console.error("Input was detected in the options menu, but unable to indentify the option selected.");
    }
  }
  
  return (
    <div id='dashboard'>
      <h3>Dashboard</h3>
      <div className='paper'>
        {/* Title */}
        <div>
          {!!questList && Object.keys(questList)?.length > 0 && 
            <h3 style={{backgroundColor: '#333', padding: '15px'}}>
              {questList[Object.keys(questList)[targetIndex]].title}
            </h3>
          }
        </div>

        {/* Description */}
        <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
          <h3>Details</h3>
          {!!questList && Object.keys(questList)?.length > 0 && 
            <p style={{flexGrow: 1, backgroundColor: '#333', padding: '15px'}}>
              {questList[Object.keys(questList)[targetIndex]].notes}
            </p>
          }
        </div>

        {/* Rewards - Tally, Streak, XP, AZ reward */}
        <div>
          <h3>Stats / Rewards</h3>
          <div className="rewards-grid">
            <div className="rewards-box">
              <h3>
                Task ( {targetIndex + 1} / {!!questList ? Object.keys(questList)?.length : 0} )
              </h3>
            </div>
            <div className="rewards-box">
              XP
            </div>
            <div className="rewards-box">
              Bonus XP
            </div>
          </div>
        </div>

        {/* Controls - Complete, Add, Options(Delete, Skip, Stash) */}
        <div className='controls-box'>
          <button 
            style={{backgroundColor: 'var(--brown1)'}}
            onClick={() => {
              controller.completeQuest(targetIndex);
              if (!!questList && (targetIndex >= Object.keys(questList).length - 1)) {
                setTargetIndex(0)
              }
            }}
            disabled={!questsLoaded}
          >
            Complete
          </button>
          <NewQuestButton />
          <OptionsButton handleOptionsSelection={handleOptionsSelection}/>
        </div>

      </div>
    </div>
  );
}
