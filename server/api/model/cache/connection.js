const config = require('../../../../configs/index')
const client = require("redis").createClient(config.redis)
client.auth(config.redis.password)

client.on("error", function (err) {
  console.log("Error " + err);
});

module.exports = client
