const mongoose = require('mongoose');
const { mongodb: mongodbUrl } = require('../config/config.js');

const { Schema } = mongoose;
mongoose.connect(
  mongodbUrl,
  { useNewUrlParser: true },
);
mongoose.set('useCreateIndex', true);

// 用户
exports.User = mongoose.model(
  'User',
  new Schema({
    // 手机号
    phone: String,
    // 姓名
    name: String,
    // 性别
    sex: String,
    // 大学名称
    college: String,
    // 专业
    specialty: String,
    // 毕业时间
    graduationTime: Date,
    // 生日
    birthday: Date,
    // 电子邮件
    email: String,
    // 头像
    img: String,
    // 密码
    pw: String,
    // 昵称
    nickname: {
      type: String,
      unique: true,
      index: true,
    },
  }),
);

// 简历
exports.Resume = mongoose.model(
  'Resume',
  new Schema({
    // 用户
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    // 电话
    phone: String,
    // 姓名
    name: String,
    // 性别
    sex: String,
    // 大学
    college: String,
    // 专业
    specialty: String,
    // 生日
    birthday: Date,
    // 电子邮件
    email: String,
    // 头像
    img: String,
  }),
);

// 公司
exports.Company = mongoose.model(
  'Company',
  new Schema({
    // 公司名称
    name: {
      type: String,
      unique: true,
      index: true,
    },
    // 公司类型
    type: String,
    // 公司简介
    introduction: String,
    // 商业许可
    businessLicence: String,
    // 审查状态
    status: Boolean,
    // 规模
    scope: String,
    // 营业范围
    specialty: String,
    // 公司所在城市
    city: String,
    // 公司管理员账户
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  }),
);

// 职位
exports.Job = mongoose.model(
  'Job',
  new Schema({
    // 兼职名称
    name: String,
    // 附加
    add: String,
    // 兼职的公司
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
    // 兼职所需人员数量
    amount: Number,
    // 兼职更新时间
    updated: { type: Date, default: Date.now },
    // 工资下限
    salaryMin: Number,
    // 公司上线
    salaryMax: Number,
    // 兼职信息
    jobInfo: String,
    // 兼职地点
    location: String,
  }),
);

// 申请
exports.Application = mongoose.model(
  'Application',
  new Schema({
    // 申请人员
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    // 申请的兼职
    job: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
    },
    // 状态 0：待审核 1：通过 2：拒绝
    status: Number,
  }),
);
