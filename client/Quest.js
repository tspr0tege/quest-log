export default function Quest(title) {
  const quest = Object.create(questMethods);

  quest.title = title;
  quest.description = 'Enter a description...';
  quest.progress = 0;
  quest.subQuests = [];
  quest.parentQuest = null;
  quest.parentContribution = 0;

  return quest;
}

const questMethods = {
  linearMapAll: function(cb, depth) {
    depth = depth || [0];
    let returnArray = [cb(this, depth)]

    if(this.subQuests.length > 0) {
      this.subQuests.forEach((quest, index) => {
        returnArray = returnArray.concat(quest.linearMapAll(cb, [...depth, index]));
      });
    }
    return returnArray;
  },

  complete: function() {
    // complete all children
    this.subQuests.forEach(q => {
      q.complete();
    });

    // if it has a parent
    if (this.parentQuest) {
      // send completion value to parent

      // remove from parent subQuest list
      this.parentQuest.removeChild(this);
    }
    // send XP value to profile
  },

  delete: function() {
    // delete this, and all child quests
    // perhaps a warning if there are child quests
  },

  removeChild: function(child) {
    this.subQuests.splice(this.subQuests.indexOf(child), 1);
  },

  changeParent: function(newParent) {
    if (this.parentQuest) { 
      this.parentQuest.removeChild(this);
    }
    this.parentQuest = newParent;
    if (newParent) {
      this.parentQuest.subQuests.push(this);
    }
  }
};