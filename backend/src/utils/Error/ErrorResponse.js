const logger = require('../logger')
const { SERVER_ERROR } = require('./ErrorMessage')

module.exports = function(error, res) {
  logger.error(error.message)

  const statusCode = error.statusCode ? error.statusCode : SERVER_ERROR.statusCode
  const code = error.code ? error.code : SERVER_ERROR.code
  const message = error.message ? error.message : SERVER_ERROR.message

  return res.status(statusCode).send({
    statusCode,
    code,
    message,
  })
}
