import Axios from 'axios';

export default {
  get: async (user) => {
    const profileData = await Axios.get(`/profile/${user}`)
    .then(({ data }) => data)
    .catch(console.error);
    return profileData;
  },
  create: async (form) => {
    const response = await Axios.post('/profile', form, {"Content-Type": "multipart/form-data"})
    .then(({ data }) => data)
    .catch(console.error);
    return response;
  },

  // create: async (details, user) => {
  //   let newQuest = await Axios.post('/quests', { ...details, userId: user })
  //   .then((data) => data.data)
  //   .catch(console.error);
  //   console.log(newQuest);
  //   return newQuest;
  // },

  // edit: async (editData) => {
  //   return await Axios.put('/quests', editData)
  //   .then(({ data }) => data)
  //   .catch(console.error);
  // },
  // delete: (id, user) => {
  //   Axios.delete(`quests/${id}`, { data: {user} })
  //   .then(() => {console.log('Delete successful')})
  //   .catch(console.error);
  // }
}
