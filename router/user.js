const Router = require('koa-router');
const uuidv1 = require('uuid/v1');
const fs = require('fs');
const path = require('path');
const userModel = require('../service/user');
const { checkHasSignIn } = require('../middleware/check');

const router = new Router();

router.use(checkHasSignIn);

router
  .get('/', async (ctx) => {
    const userid = ctx.cookies.get('userid');
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
  .post('/', async (ctx) => {
    const userid = ctx.cookies.get('userid');
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
    const userid = ctx.cookies.get('userid');
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
