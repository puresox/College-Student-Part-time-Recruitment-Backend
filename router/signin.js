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
  const user = await userModel.findByNickname(nickname);
  if (user && user.pw === hash) {
    await tokenModel
      .create(user.id)
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
  } else {
    ctx.body = {
      success: false,
      msg: '账户或密码错误',
    };
  }
});

module.exports = router;
