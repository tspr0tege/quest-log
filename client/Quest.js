import { v4 as uuid } from 'uuid';

export default function Quest(obj) {
  const quest = Object.create(questMethods);

  quest.id = obj.id || uuid();
  quest.title =  obj.title || '';
  quest.description =  obj.description || '';
  quest.progress =  0;
  quest.subQuests = [];
  quest.parentQuest = obj.parentQuest || null;
  quest.contribution = obj.contribution || 0;

  return quest;
}

const questMethods = {
  addSubQuest: function(quest) {
    this.subQuests.push(quest.id)
  },
};