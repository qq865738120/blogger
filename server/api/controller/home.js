const config = require('../../../configs/index')

module.exports = {
  test(req, res) {
    res.json({
      name: 123,
      config: process.env.baseUrl
    })
  }
}
