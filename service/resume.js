const { Resume } = require('../lib/mongo.js');

module.exports = {
  create: async (info) => {
    const result = await Resume.create(info);
    return result;
  },
  findByUser: async (user) => {
    const result = await Resume.find({ user });
    return result;
  },
  updateResumeById: async (id, info) => {
    const result = await Resume.updateOne({ _id: id }, { $set: info });
    return result;
  },
};
