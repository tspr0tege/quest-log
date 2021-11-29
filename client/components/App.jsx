import React from 'react';
import Modal from 'react-modal';

import Quest from '../Quest.js';

import QuestCreate from './QuestCreate.jsx';
import QuestList from './QuestList.jsx';
import QuestFocus from './QuestFocus.jsx';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
};

Modal.setAppElement('#app');
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

  sumbitNewQuest (e) {
    e.preventDefault();
    let { form } = e.target;

    let newQuest = Quest(form.text.value);
    this.setState({
      questList: [...this.state.questList, newQuest]
    });
    form.text.value = '';
  }

  sendToFocus (quest) {
    this.setState({focusOn: quest});
  }

  editQuest (quest, options) {
    // debugger;
    const { questList } = this.state;
    const change = Object.keys(options).filter((key) => {
      return quest[key] !== options[key]
    });
    let stateChanges = {showModal: false};

    change.forEach((option) => {
      switch (option) {
        case 'title':
          quest.title = options.title;
          break;

        case 'description':
          quest.description = options.description;
          break;

        case 'parent':
          // remove from current parent
          if (questList.includes(quest)) {
            stateChanges.questList = questList.filter(q => {return q !== quest});
          }
          quest.changeParent(options.parent);
          // add to new
          if (options.parent === null) {
            stateChanges.questList = [...questList, quest]
          } 
          break;

        default:
          console.error('Invalid key received in App.editQuest: ' + key);
      }
    });

    this.setState(stateChanges);
  }

  completeQuest (quest) {
    let stateChanges = {};
    if (this.state.focusOn === quest) {
      stateChanges.focusOn = {};
    }
    if (quest.parentQuest === null) { 
      stateChanges.questList = this.state.questList.filter((q) => {return q !== quest});
    } 
    quest.complete();
    this.setState(stateChanges);
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
            <QuestCreate handleClick={this.sumbitNewQuest} />
            <QuestList quests={this.state.questList} />
          </div>
          <QuestFocus quest={this.state.focusOn}/>
        </main>
      </Context.Provider>
    );
  }
}

export default App;
export { Context };
