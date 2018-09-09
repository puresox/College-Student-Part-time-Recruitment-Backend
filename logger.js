const log4js = require('log4js');

log4js.configure({
  appenders: {
    app: {
      type: 'dateFile',
      filename: 'logs/application.log',
      // compress: true,
      keepFileExt: true,
      daysToKeep: 3,
    },
    console: { type: 'console' },
  },
  categories: {
    default: { appenders: ['app', 'console'], level: 'debug' },
  },
});
const logger = log4js.getLogger();

exports.logger = logger;
