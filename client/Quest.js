import { v4 as uuid } from 'uuid';

export default function Quest(obj) {
  const quest = Object.create(questMethods);

  quest.id = obj.id || uuid();
  quest.title =  obj.title || '';
  quest.description =  obj.description || '';
  quest.progress =  obj.progress || 0;
  quest.subQuests =  obj.subQuests || [];
  quest.parentQuest =  obj.parentQuest || null;
  quest.contribution =  obj.contribution || 0;

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
    this.subQuests.forEach(q => {
      q.complete();
    });
    if (this.parentQuest) {
      this.parentQuest.removeChild(this);
    }
    // send XP value to profile
  },

  delete: function() {
    // if children 
      // recalibrate contribution of all children to 0
      // change parent of all children to this parent
    // remove this from its parent
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