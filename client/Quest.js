export default function Quest(title) {
  const quest = Object.create(questMethods);

  quest.subQuests = [];
  quest.title = title;

  return quest;
}

const questMethods = {
  delete: function() {},
  addSubQuest: function() {},
  complete: function() {
    
    this.delete();
  }
};