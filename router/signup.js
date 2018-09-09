const Router = require('koa-router');
const crypto = require('crypto');
const userModel = require('../service/user');
const { secret, cookie } = require('../config/config');
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
    .then(({ insertId }) => {
      ctx.cookies.set('userid', insertId, cookie);
      ctx.cookies.set('username', nickname, cookie);
      ctx.body = {
        success: true,
        msg: '登录成功',
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
