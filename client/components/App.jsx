import React from 'react';
import Modal from 'react-modal';

import Quest from '../Quest.js';
import Data from '../Data.js';

import QuestCreate from './QuestCreate.jsx';
import QuestList from './QuestList.jsx';
import QuestFocus from './QuestFocus.jsx';
import ProfileCreate from './ProfileCreate.jsx';

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
    return new Promise((resolve, reject) => {
      e.preventDefault();
      let { form } = e.target;  
      let newQuest = Quest({title: form.text.value});
      this.setStateAwait({
        questList: [...this.state.questList, newQuest]
      })
      .then((newQuestlist) => {
        form.text.value = '';
        this.saveQuestList();
        resolve(newQuestlist)
      });
    });
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

        case 'parentQuest':
          // remove from current parent
          if (questList.includes(quest)) {
            stateChanges.questList = questList.filter(q => {return q !== quest});
          }
          quest.changeParent(options.parentQuest);
          // add to new
          if (options.parentQuest === null) {
            stateChanges.questList = [...questList, quest]
          } 
        break;

        case 'contribution':
          quest.contribution = options.contribution;
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
    quest.complete();    

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
    let questList = {};
    let qArray = this.state.questList.flatMap((q) => {
      return q.linearMapAll((quest) => {return quest});
    });
    // console.log(qArray);
    qArray.forEach((qObj) => {
      let newObj = {
        id: qObj.id,
        title: qObj.title,
        description: qObj.description,
        progress: qObj.progress,
        subquests: [],
        parentQuest: (qObj.parentQuest) ? qObj.parentQuest.id : null,
        contribution: qObj.contribution
      }
      if (qObj.subQuests.length > 0) {
        newObj.subQuests = qObj.subQuests.map((subQ) => {
          return subQ.id;
        });
      }
      questList[qObj.id] = newObj;
    });
    Data.save({ questList });
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
        // questList is an obj of objects, where each key is the object's id
        // create an array and populate it with all of the questList objects with parentQuest === null
        let newState = []; 
        Object.keys(questList).forEach((key) => {
          if (questList[key].parentQuest === null) {
            newState.push(Quest(questList[key]));
          }
        });
        // newState has an array of quests with null parents and an array of ids for subQuests
        
        // recursively iterate through all subQuest lists, populating the array with Quest data structures
        newState.forEach((quest) => {
          if (quest.subQuests.length > 0) { 
            quest.subQuests = createChildren(quest); 
          }
        });
        
        function createChildren (quest) {
          let newSubQuestList = [];
          quest.subQuests.forEach((subQ) => {
            // subQ will be the id string            
            let newSubQuest = Quest(questList[subQ]);
            if (newSubQuest.subQuests.length > 0) {
              newSubQuest.subQuests = createChildren(newSubQuest);
            }
            newSubQuest.parentQuest = quest;
            newSubQuestList.push(newSubQuest);
          });
          return newSubQuestList
        }

        // assign rebuilt array to state.questList
        this.setState({ questList: newState });
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
