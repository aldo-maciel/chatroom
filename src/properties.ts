export const properties = {
  server: {
    port: process.env.PORT || 3000,
  },
  mongo: {
    host: process.env.MONGODB_HOST || 'localhost',
    port: process.env.MONGODB_PORT || 27017,
    base: process.env.MONGODB_BASE || 'chatroom',
  },
  log: {
    level: process.env.LOG_LEVEL || 'INFO',
    daysToKeep: process.env.LOG_DAYS || 15,
    path: process.env.LOG_PATH || 'logs/',
  },
  general: {
    masLengthUrl: parseInt(process.env.MAX_LENGTH_URL || '8', 10),
    stockUrl(stockCode: string): string {
      return `https://stooq.com/q/l/?s=${stockCode}&f=sd2t2ohlcv&h&e=csv`;
    },
  },
  rabbitMq: {
    url: process.env.RABBIT_MQ || 'amqp://localhost',
  },
};
