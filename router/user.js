const Router = require('koa-router');
const uuidv1 = require('uuid/v1');
const fs = require('fs');
const path = require('path');
const userModel = require('../service/user');
const companyModel = require('../service/company');
const applicationModel = require('../service/application');
const { checkHasSignIn } = require('../middleware/check');

const router = new Router();

router.use(checkHasSignIn);

router
  .get('/', async (ctx) => {
    const { userid } = ctx;
    await userModel
      .findById(userid)
      .then((user) => {
        ctx.body = {
          success: true,
          msg: user,
        };
      })
      .catch(({ message }) => {
        ctx.body = {
          success: false,
          msg: message,
        };
      });
  })
  .get('/company', async (ctx) => {
    const { userid } = ctx;
    await companyModel
      .findByAdmin(userid)
      .then((companies) => {
        ctx.body = {
          success: true,
          msg: companies,
        };
      })
      .catch(({ message }) => {
        ctx.body = {
          success: false,
          msg: message,
        };
      });
  })
  .get('/application', async (ctx) => {
    const { userid } = ctx;
    await applicationModel
      .findByUser(userid)
      .then((applications) => {
        ctx.body = {
          success: true,
          msg: applications,
        };
      })
      .catch(({ message }) => {
        ctx.body = {
          success: false,
          msg: message,
        };
      });
  })
  .post('/', async (ctx) => {
    const { userid } = ctx;
    const {
      phone,
      name,
      sex,
      college,
      specialty,
      graduationTime,
      birthday,
      email,
    } = ctx.request.body;
    await userModel
      .updateInfoById(userid, {
        phone,
        name,
        sex,
        college,
        specialty,
        graduationTime,
        birthday,
        email,
      })
      .then(() => {
        ctx.body = {
          success: true,
          msg: '更新成功',
        };
      })
      .catch(({ message }) => {
        ctx.body = {
          success: false,
          msg: message,
        };
      });
  })
  .post('/img', async (ctx) => {
    const { userid } = ctx;
    const { img } = ctx.request.body;
    const dataBuffer = Buffer.from(img, 'base64');
    const imgname = `${uuidv1()}.jpg`;
    const imgPath = path.resolve(__dirname, `../public/img/${imgname}`);
    fs.writeFileSync(imgPath, dataBuffer);
    await userModel
      .updateImgById(userid, imgname)
      .then(() => {
        ctx.body = {
          success: true,
          msg: '更新成功',
        };
      })
      .catch(({ message }) => {
        ctx.body = {
          success: false,
          msg: message,
        };
      });
  });

module.exports = router;
