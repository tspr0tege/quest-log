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
    add: (details) => {
      Axios.post('/newquest',
      {
        title: details.title,
        description: details.description,
      },
      {
        headers: {
          contentType: 'Application/json'
        }
      })
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