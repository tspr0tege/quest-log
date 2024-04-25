import Axios from 'axios';

export default {
  get: async (questList, user) => {
    let questData = await Axios.post('/quests/get', { questList, user })
    .then(({ data }) => data)
    .catch(console.error);
    return questData;
  },
  create: async (details, user) => {
    let newQuest = await Axios.post('/quests', { ...details, userId: user })
    .then((data) => data.data)
    .catch(console.error);
    return newQuest;
  },
  edit: async (editData) => {
    return await Axios.put('/quests', editData)
    .then(({ data }) => {
      console.log(data[0][1]);
      return data[0][1];
    })
    .catch(console.error);
  },
  complete: async (questId, user) => {
    const putData = { user, questId };
    return await Axios.put('/quests/complete', putData)
    // response object should include status message and updated user data
    .then(({ data }) => {data})
    .catch(console.error);
  },
  delete: (questId) => {
    Axios.post('/quests/delete', { questId })
    .then(() => {console.log('Successfully deleted!')})
    .catch(console.error);
  }
}
