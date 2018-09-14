const Router = require('koa-router');
const crypto = require('crypto');
const userModel = require('../service/user');
const tokenModel = require('../service/token');
const { secret } = require('../config/config');
const { checkNotSignIn } = require('../middleware/check');

const router = new Router();

router.use(checkNotSignIn);

router.post('/', async (ctx) => {
  const { nickname, pw } = ctx.request.body;
  const hash = crypto
    .createHmac('sha256', secret)
    .update(pw)
    .digest('hex');
  await userModel
    .create(nickname, hash)
    .then(async ({ _id: userid }) => {
      await tokenModel
        .create(userid)
        .then(({ _id: token }) => {
          ctx.body = {
            success: true,
            msg: token,
          };
        })
        .catch(({ message }) => {
          ctx.body = {
            success: false,
            msg: message,
          };
        });
    })
    .catch(({ message }) => {
      ctx.body = {
        success: false,
        msg: message,
      };
    });
});

module.exports = router;
