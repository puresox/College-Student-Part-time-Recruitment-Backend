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
  const user = await userModel.findByNickname(nickname);
  if (user && user.pw === hash) {
    ctx.cookies.set('userid', user.id, cookie);
    ctx.cookies.set('nickname', user.nickname, cookie);
    ctx.body = {
      success: true,
      msg: '登录成功',
    };
  } else {
    ctx.body = {
      success: false,
      msg: '账户或密码错误',
    };
  }
});

module.exports = router;
