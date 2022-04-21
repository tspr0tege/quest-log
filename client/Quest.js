// import { v4 as uuid } from 'uuid';
import Axios from 'axios';

  // export default function Quest(obj) {
  //   const quest = Object.create(questMethods);

  //   quest.id = obj.id || uuid();
  //   quest.title =  obj.title || '';
  //   quest.description =  obj.description || '';
  //   quest.progress =  0;
  //   quest.subQuests = [];
  //   quest.parentQuest = obj.parentQuest || null;
  //   quest.contribution = obj.contribution || 0;

  //   return quest;
  // }

  export default {
    get: (questList) => {
      Axios.post('/getquests', 
        {body: questList}, 
        { headers })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(console.error);
    },

    create: async (details) => {
      let newQuest = await Axios.post('/newquest', details)
      .then(({ data }) => {
        // console.log('received new quest' + JSON.stringify(data));
        return data;
      })
      .catch(console.error);
      // console.log('returning new quest')
      // cb('logging new quest: ' + newQuest);
      return newQuest;
    },
    edit: () => {},
    delete: () => {}
  }

const questMethods = {
  addSubQuest: function(quest) {
    this.subQuests.push(quest.id)
  },
  setParent: function(newParent) {
    this.parentQuest = newParent.id;
    newParent.addSubQuest(this);
  },
  getChildren: function() {} // This can work, with AJAX
};