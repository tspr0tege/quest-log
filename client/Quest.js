export default function Quest(title) {
  const quest = Object.create(questMethods);

  quest.title = title;
  quest.description = '';
  quest.progress = 0;
  quest.subQuests = [];
  quest.parentQuest = null;
  quest.parentContribution = 0;

  return quest;
}

const questMethods = {
  delete: function() {},
  addSubQuest: function() {},
  complete: function() {    
    this.delete();
  },
  mapAll: function() {}
};