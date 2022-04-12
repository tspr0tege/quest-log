import React from 'react';

export default ({quest: {title, description, parentQuest, contribution}, submit}) => {
  return(
    <form id='quest-edit-form'>
      <div>
        <h3>Title:</h3>
        <input 
          type='text'
          name='title'
          defaultValue={title}>
        </input>
      </div>
      <div>
        <h3>Description:</h3>
        <textarea 
          name='description'
          defaultValue={description}
          placeholder='Enter a description...' 
          rows='5' 
          style={{width: '95%'}}>
        </textarea>
      </div>
      {/* <div>
        <h3>Progress:</h3>
        <p>{quest.progress}%</p>
      </div> */}
      {/* <div>
        <h3>Sub-quests:</h3>
        <QuestList  quests={quest.subQuests} />
      </div> */}
      {/* <div>
        <h3>Parent Quest Line:</h3>
        <select
          id="parent-quest-dropdown" 
          // onChange={updateParent}
          defaultValue={(parentQuest) ? parentQuest : null}>

          <option value={null}>None</option>
          {dropList(quest)}
        </select>
      </div>
      {parentQuest && <div>
        <h3>Contribution to Quest Line:</h3>
        <div style={{display: 'flex'}}>
          <input 
            type='range' 
            min='0' max='100' step='1' 
            value={options.contribution} 
            onChange={updateContribution}/>

          <input 
            type='number' 
            min='0' max='100' 
            value={options.contribution} 
            onChange={updateContribution}/>

        </div>
      </div>} */}
      <button onClick={submit} style={{marginTop: '20px'}}>Submit Changes</button>
    </form>
  );
}

// const dropList = (targetQuest) => {
//   const { questList } = useContext(Context);

//   // List of quests (self and children) that would be invalid parents
//   let skipList = targetQuest.linearMapAll((quest) => {
//     return quest;
//   });

//   // Returns all quests that are not in skip list, from App.state object
//   const fullList = questList.map((quest, index) => {
//     return quest.linearMapAll((q, depth) => {      
//       let key = depth.join('-');
//         if(!skipList.includes(q)) {
//           return <option value={q.id} data-depth={key} key={key}>{q.title}</option>
//         }
//     }, [index]);
//   });
//   return fullList;
// }