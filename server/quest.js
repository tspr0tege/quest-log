const uuid = require('uuid').v4;

module.exports = {
  create: ({title, description}) => {
    return {
      id: uuid(),
      title:  title || '',
      description:  description || '',
      progress:  0,
      subQuests: [],
      parentQuest: null,
      contribution: 0
    };
  }
}