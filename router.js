const Router = require('koa-router');
const signup = require('./router/signup');
const signin = require('./router/signin');
const user = require('./router/user');
const resume = require('./router/resume');

const router = new Router();

router.use('/signup', signup.routes(), signup.allowedMethods());
router.use('/signin', signin.routes(), signin.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());
router.use('/resume', resume.routes(), resume.allowedMethods());

module.exports = router;
