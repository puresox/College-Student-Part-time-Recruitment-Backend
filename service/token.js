const { Token } = require('../lib/mongo.js');

module.exports = {
  create: async (user) => {
    const result = await Token.create({ user });
    return result;
  },
  findById: async (id) => {
    const result = await Token.findById(id);
    return result;
  },
};
