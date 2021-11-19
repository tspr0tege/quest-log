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
  mapAll: function(cb, depth) {
    depth = depth || [0];
    let returnArray = [cb(this, depth.join('-'))]
    if(this.subQuests.length > 0) {
      returnArray = returnArray.concat(this.subQuests.map((quest, index) => {
        return quest.mapAll(cb, [...depth, index])      
      }));
    }
    return returnArray;
  }
};