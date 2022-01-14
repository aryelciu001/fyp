class MyError extends Error {
  constructor (errorObject) {
    super(errorObject.message)
    this.code = errorObject.code
  }
}

module.exports = MyError