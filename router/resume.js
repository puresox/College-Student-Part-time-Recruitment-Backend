const Router = require('koa-router');
const uuidv1 = require('uuid/v1');
const fs = require('fs');
const path = require('path');
const resumeModel = require('../service/resume');
const { checkHasSignIn } = require('../middleware/check');

const router = new Router();

router.use(checkHasSignIn);

router
  .get('/', async (ctx) => {
    const userid = ctx.cookies.get('userid');
    await resumeModel
      .findByUser(userid)
      .then((resumes) => {
        ctx.body = {
          success: true,
          msg: resumes,
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
      phone, name, sex, college, specialty, birthday, email, img,
    } = ctx.request.body;
    const dataBuffer = Buffer.from(img, 'base64');
    const imgname = `${uuidv1()}.jpg`;
    const imgPath = path.resolve(__dirname, `../public/img/${imgname}`);
    fs.writeFileSync(imgPath, dataBuffer);
    await resumeModel
      .create({
        user: userid,
        phone,
        name,
        sex,
        college,
        specialty,
        birthday,
        email,
        img: imgname,
      })
      .then(() => {
        ctx.body = {
          success: true,
          msg: '创建成功',
        };
      })
      .catch(({ message }) => {
        ctx.body = {
          success: false,
          msg: message,
        };
      });
  })
  .put('/', async (ctx) => {
    const userid = ctx.cookies.get('userid');
    const {
      id, phone, name, sex, college, specialty, birthday, email, img,
    } = ctx.request.body;
    const dataBuffer = Buffer.from(img, 'base64');
    const imgname = `${uuidv1()}.jpg`;
    const imgPath = path.resolve(__dirname, `../public/img/${imgname}`);
    fs.writeFileSync(imgPath, dataBuffer);
    await resumeModel
      .updateResumeById(id, {
        user: userid,
        phone,
        name,
        sex,
        college,
        specialty,
        birthday,
        email,
        img: imgname,
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
  });

module.exports = router;
