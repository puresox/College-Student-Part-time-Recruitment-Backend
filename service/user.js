const { User } = require('../lib/mongo.js');

module.exports = {
  create: async (nickname, pw) => {
    const result = await User.create({ nickname, pw });
    return result;
  },
  findByNickname: async (nickname) => {
    const result = await User.findOne({ nickname });
    return result;
  },
  findById: async (id) => {
    const result = await User.findById(id);
    delete result.pw;
    return result;
  },
  updateInfoById: async (id, info) => {
    const result = await User.updateOne({ _id: id }, { $set: info });
    return result;
  },
  updateImgById: async (id, img) => {
    const result = await User.updateOne({ _id: id }, { $set: { img } });
    return result;
  },
};
