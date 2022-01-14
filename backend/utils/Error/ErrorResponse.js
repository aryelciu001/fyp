module.exports = function(error, res) {
  const { statusCode, code, message } = error
  return res.status(error.statusCode).send({
    statusCode,
    code,
    message,
  })
}