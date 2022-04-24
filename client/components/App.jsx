import React from 'react';
import Modal from 'react-modal';

import Quest from '../Quest.js';
// import Data from '../Data.js';

import QuestCreate from './quests/QuestCreate/QuestCreate.jsx';
import QuestList from './quests/QuestList/QuestList.jsx';
import QuestFocus from './quests/QuestFocus/QuestFocus.jsx';
// import ProfileCreate from './ProfileCreate.jsx';

Modal.setAppElement('#app');
const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 'fit-content',
    maxHeight: '85vh',
    overflowY: 'auto'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
};

const Context = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questList: [],
      showModal: false,
      modalContent: "Nothing to see here!",
      focusOn: {},
      profile: {}
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.showInModal = this.showInModal.bind(this);
    this.sumbitNewQuest = this.sumbitNewQuest.bind(this);
    this.sendToFocus = this.sendToFocus.bind(this);
    this.editQuest = this.editQuest.bind(this);
    this.completeQuest = this.completeQuest.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
  }

  toggleModal () {
    this.setState({showModal: !this.state.showModal})
  }

  showInModal (content) {
    content = content || 'Oops! Something is missing!';
    this.setState(
      {modalContent: content},
      this.toggleModal
    );
  }

  setStateAwait (state) {
    return new Promise((resolve, reject) => {
      this.setState(state, () => {resolve(this.state.questList);});
    });
  }

  sumbitNewQuest (e) {
    return new Promise (async (resolve, reject) => {
      e.preventDefault();
      try {
        const { form } = e.target;
        let newQuest = await Quest.create({
          title: form.title.value
        });
        this.setState({questList: [...this.state.questList, newQuest]});
        e.target.form.title.value = '';
        resolve(newQuest);
      }
      catch(err) {
        reject(err);
      }
    });
  }

  sendToFocus (quest) {
    this.setState({focusOn: quest});
  }

  editQuest (quest, newData) {
    let questListCopy = this.state.questList.slice();
    const changeTarget = questListCopy.find(q => q.id === quest.id);
    for (let prop in newData) {
      quest[prop] = newData[prop];
    }
    Quest.edit(quest, (updatedQuest) => {
      questListCopy[changeTarget] = updatedQuest;
      this.setState({
        showModal: false,
        questList: questListCopy
      })
    });
  }

  completeQuest (quest) {
    Quest.delete(quest.id);
    let questList = this.state.questList.slice().filter((q) => q.id != quest.id);
    this.setState({ questList });
  }

  saveProfile (profile) {

  }

  saveQuestList () {
    
  }

  render() {

    return(
      <Context.Provider value={{
        sendToModal: this.showInModal,
        completeQuest: this.completeQuest,
        editQuest: this.editQuest,
        sendToFocus: this.sendToFocus,
        questList: this.state.questList
      }}>

        <Modal 
        style={modalStyle}
        isOpen={this.state.showModal}
        onRequestClose={this.toggleModal}
        shouldCloseOnOverlayClick={true}>
          {this.state.modalContent}
        </Modal>

        <main>
          <div>
            <QuestCreate 
            handleClick={this.sumbitNewQuest} 
            sendToModal={this.showInModal} 
            questList={this.state.questList} />

            <QuestList quests={this.state.questList} />
          </div>
          <QuestFocus quest={this.state.focusOn}/>
        </main>
      </Context.Provider>
    );
  }

  componentDidMount () {
    // Load full quest list
    (async () => {
      const objectList = await Quest.get();
      const questList = [];
      for (let obj in objectList) {
        questList.push(objectList[obj]);
      }
      this.setState({ questList });
    })();

  }
}

export default App;
export { Context };
