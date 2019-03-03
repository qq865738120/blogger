const config = require('../../../../configs/index')
const client = require("redis").createClient(config.redis)

if (config.NODE_ENV == 'pro') {
  client.auth(config.redis.password)
}

client.on("error", function (err) {
  console.log("Error " + err);
});

module.exports = client
