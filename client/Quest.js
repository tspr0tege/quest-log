import Axios from 'axios';

export default {
  get: async (questList) => {
    let questData = await Axios.post('/quests/get', { questList })
    .then(({ data }) => data)
    .catch(console.error);
    return questData;
  },

  create: async (details) => {
    let newQuest = await Axios.post('/quests/create', details)
    .then(({ data }) => data )
    .catch(console.error);
    return newQuest;
  },

  edit: async (newData, callback = ()=>{}) => {
    await Axios.put('/quests/edit', newData)
    .then(({ data }) => {
      callback(data);
    })
    .catch(console.error);
  },
  delete: (id) => {
    Axios.delete(`quests/delete/${id}`)
    .then(() => {console.log('Delete successful')})
    .catch(console.error);
  }
}
