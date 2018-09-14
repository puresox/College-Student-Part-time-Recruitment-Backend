const tokenModel = require('../service/token');

module.exports = {
  checkHasSignIn: async (ctx, next) => {
    const { token: tokenId } = ctx.header;
    const token = await tokenModel.findById(tokenId);
    if (!token) {
      ctx.body = { success: false, msg: '您未登录' };
    } else {
      ctx.userid = token.user;
      await next();
    }
  },
  checkNotSignIn: async (ctx, next) => {
    const { token: tokenId } = ctx.header;
    const token = await tokenModel.findById(tokenId);
    if (token) {
      ctx.body = { success: false, msg: '您已登录' };
    } else {
      await next();
    }
  },
};
