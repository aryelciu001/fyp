const logger = require('../logger')
const MyError = require('./Error')
const ErrorMessage = require('./ErrorMessage')

module.exports = {
  defaultErrorHandler: function (e, reject) {
    logger.error(e.message)
    return reject(new MyError(ErrorMessage.SERVER_ERROR))
  }
}