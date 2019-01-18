import config from 'config/base-config.js'
module.exports = {
  test(req, res) {
    res.json({
      name: 123,
      config: config
    })
  }
}
