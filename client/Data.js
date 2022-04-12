export default {
  save: (data) => {
    Object.keys(data).forEach((key) => {
      localStorage.setItem(key, JSON.stringify(data[key]));
    });
  },

  load: (data) => {
    return new Promise((resolve, reject) => {
      if(localStorage.getItem(data)) {
        resolve(JSON.parse(localStorage[data]));
      } else {
        reject(localStorage.getItem(data));
      }
    });
  }
}