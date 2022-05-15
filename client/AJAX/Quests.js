import Axios from 'axios';

const c = document.cookie;
const cookieObj = JSON.parse(c.substring(c.indexOf('{'), c.indexOf('}')+1));
const user = cookieObj.profile_id;
console.log(user);

export default {
  get: async (questList) => {
    let questData = await Axios.post('/quests/get', { questList, user })
    .then(({ data }) => data)
    .catch(console.error);
    return questData;
  },

  create: async (details) => {
    let newQuest = await Axios.post('/quests/create', { ...details, userId: user })
    .then((data) => data.data)
    .catch(console.error);
    console.log(newQuest);
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
    Axios.delete(`quests/delete/${id}`, { data: {user} })
    .then(() => {console.log('Delete successful')})
    .catch(console.error);
  }
}
