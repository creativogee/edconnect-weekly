const store = require('store');

const localStorage = {
  create: (obj) => {
    const key = Object.keys(obj)[0];
    const value = Object.values(obj)[0];
    store.set(key, value);
  },

  getOne: (key) => {
    store.get(key);
  },

  deleteOne(key) {
    store.remove(key);
  },

  drop() {
    store.clearAll();
  },
};

module.exports = { localStorage };
