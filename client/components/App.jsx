import React from 'react';
import Modal from 'react-modal';

import Quest from '../Quest.js';

import QuestCreate from './QuestCreate.jsx';
import QuestList from './QuestList.jsx';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    // top: '50%',
    // top: '50%',
    // marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
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
      modalContent: "Nothing to see here!"
    };

    this.sumbitNewQuest = this.sumbitNewQuest.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.showInModal = this.showInModal.bind(this);
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
    console.log(form.text.value);

    let newQuest = Quest(form.text.value);
    this.setState({
      questList: [...this.state.questList, newQuest]
    });
  }

  render() {

    return(
      <Context.Provider value={{
        sendToModal: this.showInModal,
        questList: this.state.questList
      }}>
        <Modal 
          style={modalStyle}
          isOpen={this.state.showModal}
          onRequestClose={this.toggleModal}
          shouldCloseOnOverlayClick={true}
        >
          {this.state.modalContent}
        </Modal>
        <p>App.jsx has been loaded</p>
        <QuestCreate handleClick={this.sumbitNewQuest} />
        <QuestList quests={this.state.questList} />
      </Context.Provider>
    );
  }
}

export default App;
export { Context };
