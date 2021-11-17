import React from 'react';
import Quest from '../Quest.js';

import AddQuest from './AddQuest.jsx';
import QuestList from './QuestList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questList: []
    };

    this.sumbitNewQuest = this.sumbitNewQuest.bind(this);
  }

  sumbitNewQuest (e) {
    e.preventDefault();
    let { form } = e.target;
    console.log(form.text.value);

    this.setState({
      questList: [...this.state.questList, form.text.value]
    });
  }

  render() {
    return(
      <>
        <p>App.jsx has been loaded</p>
        <AddQuest handleClick={this.sumbitNewQuest} />
        <QuestList quests={this.state.questList} />
      </>
    );
  }
}

export default App;