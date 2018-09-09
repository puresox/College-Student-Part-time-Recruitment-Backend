const Router = require('koa-router');
const signup = require('./router/signup');
const signin = require('./router/signin');

const router = new Router();

router.use('/signup', signup.routes(), signup.allowedMethods());
router.use('/signin', signin.routes(), signin.allowedMethods());

module.exports = router;
