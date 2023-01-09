import Axios from 'axios';

// const c = document.cookie;
// const cookieObj = JSON.parse(c.substring(c.indexOf('{'), c.indexOf('}')+1));
// const user = cookieObj.profile_id;
// console.log(user);


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
    console.log(newQuest);
    return newQuest;
  },

  edit: async (editData) => {
    return await Axios.put('/quests', editData)
    .then(({ data }) => data)
    .catch(console.error);
  },
  delete: (id, user) => {
    Axios.delete(`quests/${id}`, { data: {user} })
    .then(() => {console.log('Delete successful')})
    .catch(console.error);
  }
}
