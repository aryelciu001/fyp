class MyError extends Error {
  constructor (errorObject) {
    super(errorObject.message)
    this.code = errorObject.code
    this.statusCode = errorObject.statusCode
  }
}

module.exports = MyError