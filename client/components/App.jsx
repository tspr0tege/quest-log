import React from 'react';
import Modal from 'react-modal';

import Quest from '../Quest.js';
import Data from '../Data.js';

import QuestCreate from './QuestCreate.jsx';
import QuestList from './QuestList.jsx';
import QuestFocus from './QuestFocus.jsx';
import ProfileCreate from './ProfileCreate.jsx';

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
    // return new Promise((resolve, reject) => {
    //   e.preventDefault();
    //   let { form } = e.target;  
    //   let newQuest = Quest({title: form.text.value});
    //   this.setStateAwait({
    //     questList: [...this.state.questList, newQuest]
    //   })
    //   .then((newQuestlist) => {
    //     form.text.value = '';
    //     // this.saveQuestList();
    //     resolve(newQuestlist)
    //   });
    // });
    return new Promise (async (res, rej) => {
      e.preventDefault();
      try {
        const { form } = e.target;
        console.log('sending new quest for creation')
        let newQuest = await Quest.create({
          title: form.title.value
        });
        this.setState({questList: [...this.state.questList, newQuest]});
        res(newQuest);
      }
      catch(err) {
        rej(err);
      }
    });
  }

  sendToFocus (quest) {
    this.setState({focusOn: quest});
  }

  editQuest (quest, newData) {
    const { questList } = this.state;
    const change = Object.keys(newData).filter((key) => {
      return quest[key] !== newData[key]
    });
    let stateChanges = {showModal: false};

    change.forEach((prop) => {
      switch (prop) {
        case 'title':
          quest.title = newData.title;
        break;

        case 'description':
          quest.description = newData.description;
        break;

        case 'parentQuest':
          // remove from current parent
          let newParentIdx = questList.findIndex(q => q.id === newData.parentQuest);
          quest.setParent(questList[newParentIdx]);
        break;

        case 'contribution':
          quest.contribution = newData.contribution;
        break;

        default:
          console.error('Invalid key received in App.editQuest: ' + option);
      }
    });

    this.setState(stateChanges, this.saveQuestList);
  }

  completeQuest (quest) {
    let stateChanges = {};
    // Clear focus if completed quest is in it
    if (this.state.focusOn === quest) {
      stateChanges.focusOn = {};
    }
    // remove quest from parent, if it's state
    if (quest.parentQuest === null) { 
      stateChanges.questList = this.state.questList.filter((q) => {return q !== quest});
    }
    //quest.complete();    

    // distribute contribution and check for parent completion
    let completeParent = false;
    if (quest.parentQuest){
      let parent = quest.parentQuest;
      if (quest.contribution + parent.progress < 100) {
        parent.progress += quest.contribution;
      } else {
        parent.progress = 99;
        if (window.confirm(`Completing this quest will raise the progress of the quest: ${parent.title} to 100%. Click "OK" to continue, or "Cancel" to set ${parent.title}'s progress to 99%`)) {
          completeParent = true;
        }
      }
    }
    this.setState(stateChanges, this.saveQuestList);
    if (completeParent) {this.completeQuest(quest.parentQuest)}
  }

  saveProfile (profile) {
    Data.save({ profile });
    this.setState({ profile });
  }

  saveQuestList () {    
    Data.save({questList: this.state.questList});
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
    Data.load('profile')
    // load profile
    .then((profile) => {
      this.setState({ profile });
      // next: load quest list
      Data.load('questList')
      .then((questList) => {

        this.setState({ questList });
      })
      .catch(() => {});
    })
    // create profile if there isn't one
    // Note: there shouldn't be a questList if there is no profile
    .catch(() => {
      this.showInModal(<ProfileCreate save={this.saveProfile} />)
    });
  }
}

export default App;
export { Context };
