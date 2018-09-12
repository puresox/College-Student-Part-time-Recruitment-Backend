const Router = require('koa-router');
const uuidv1 = require('uuid/v1');
const fs = require('fs');
const path = require('path');
const companyModel = require('../service/company');
const { checkHasSignIn } = require('../middleware/check');

const router = new Router();

router.use(checkHasSignIn);

router
  .get('/:id', async (ctx) => {
    const companyId = ctx.params.id;
    await companyModel
      .findById(companyId)
      .then((company) => {
        ctx.body = {
          success: true,
          msg: company,
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
      name, type, introduction, scope, specialty, city,
    } = ctx.request.body;
    await companyModel
      .create({
        name,
        type,
        introduction,
        scope,
        specialty,
        city,
        admin: userid,
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
  .post('/businessLicence', async (ctx) => {
    const { id, businessLicence } = ctx.request.body;
    const dataBuffer = Buffer.from(businessLicence, 'base64');
    const imgname = `${uuidv1()}.jpg`;
    const imgPath = path.resolve(__dirname, `../public/img/${imgname}`);
    fs.writeFileSync(imgPath, dataBuffer);
    await companyModel
      .updateBusinessLicenceById(id, {
        businessLicence: imgname,
        status: true,
      })
      .then(() => {
        ctx.body = {
          success: true,
          msg: '上传成功',
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
    const {
      id, name, type, introduction, scope, specialty, city,
    } = ctx.request.body;
    await companyModel
      .updateCompanyById(id, {
        name,
        type,
        introduction,
        scope,
        specialty,
        city,
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
