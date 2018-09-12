const { Job } = require('../lib/mongo.js');

module.exports = {
  create: async (info) => {
    const result = await Job.create(info);
    return result;
  },
  findById: async (id) => {
    const result = await Job.findById(id);
    return result;
  },
  findByCompany: async (company) => {
    const result = await Job.find({ company });
    return result;
  },
  updateById: async (id, info) => {
    const result = await Job.updateOne({ _id: id }, { $set: info });
    return result;
  },
  deleteById: async (id) => {
    const result = await Job.deleteOne({ _id: id });
    return result;
  },
};
