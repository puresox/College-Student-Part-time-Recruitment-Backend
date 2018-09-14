const { Application } = require('../lib/mongo.js');

module.exports = {
  create: async (info) => {
    const result = await Application.create(info);
    return result;
  },
  findByUser: async (userid) => {
    const result = await Application.find({ user: userid }).populate('job');
    return result;
  },
  findByJob: async (job) => {
    const result = await Application.find({ job }).populate('resume');
    return result;
  },
  updateById: async (id, status) => {
    const result = await Application.updateOne({ _id: id }, { $set: { status } });
    return result;
  },
};
