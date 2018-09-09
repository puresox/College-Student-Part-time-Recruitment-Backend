const { User } = require('../lib/mongo.js');

module.exports = {
  create: async (nickname, pw) => {
    const result = await User.create({ nickname, pw });
    return result;
  },
};
