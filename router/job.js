const Router = require('koa-router');
const jobModel = require('../service/job');
const applicationModel = require('../service/application');
const { checkHasSignIn } = require('../middleware/check');

const router = new Router();

router.use(checkHasSignIn);

router
  .get('/default', async (ctx) => {
    await jobModel
      .findOfDefault()
      .then((jobs) => {
        ctx.body = {
          success: true,
          msg: jobs,
        };
      })
      .catch(({ message }) => {
        ctx.body = {
          success: false,
          msg: message,
        };
      });
  })
  .post('/search', async (ctx) => {
    const { keyword } = ctx.request.body;
    await jobModel
      .findByKeyword(keyword)
      .then((jobs) => {
        ctx.body = {
          success: true,
          msg: jobs,
        };
      })
      .catch(({ message }) => {
        ctx.body = {
          success: false,
          msg: message,
        };
      });
  })
  .post('/application', async (ctx) => {
    const { userid } = ctx;
    const { jobId, resumeId } = ctx.request.body;
    await applicationModel
      .create({
        resume: resumeId,
        job: jobId,
        user: userid,
        status: 0,
      })
      .then(() => {
        ctx.body = {
          success: true,
          msg: '申请成功',
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
