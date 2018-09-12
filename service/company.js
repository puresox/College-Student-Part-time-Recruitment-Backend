const { Company } = require('../lib/mongo.js');

module.exports = {
  create: async (info) => {
    const result = await Company.create(info);
    return result;
  },
  findById: async (id) => {
    const result = await Company.findById(id);
    return result;
  },
  findByAdmin: async (admin) => {
    const result = await Company.find({ admin });
    return result;
  },
  updateCompanyById: async (id, info) => {
    const result = await Company.updateOne({ _id: id }, { $set: info });
    return result;
  },
  updateBusinessLicenceById: async (id, info) => {
    const result = await Company.updateOne({ _id: id }, { $set: info });
    return result;
  },
};
