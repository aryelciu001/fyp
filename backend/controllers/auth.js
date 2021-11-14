class Auth {
  static isAdmin(req, res, next) {
    // if request is from admin
    if (true) {
      return next()
    }
    // else 401
    return res.status(401).send({ msg: "not_authorized" })
  }
}

module.exports = Auth