module.exports = {
  checkHasSignIn: async (ctx, next) => {
    const userid = ctx.cookies.get('userid', { signed: true });
    if (!userid) {
      ctx.body = { success: false, msg: '您未登录' };
    } else {
      ctx.userid = userid;
      await next();
    }
  },
  checkNotSignIn: async (ctx, next) => {
    const userid = ctx.cookies.get('userid', { signed: true });
    if (userid) {
      ctx.body = { success: false, msg: '您已登录' };
    } else {
      await next();
    }
  },
};
