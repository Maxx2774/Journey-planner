const { createClient } = require("redis");

const redis = createClient({
  url: "redis://redis-17161.crce175.eu-north-1-1.ec2.redns.redis-cloud.com:17161",
  password: "eCcPp7U4hMNESDLTkZgTrzzcKuXQWXfa",
});

redis.connect();

module.exports = redis;
