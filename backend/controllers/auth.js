const { mysqlQuery } = require('../utils/mysqlQuery')
const { generateToken, verifyToken } = require('../utils/jwt')
const { passwordIsCorrect } = require('../utils/bcrypt')

module.exports =  {
  /**
   * @description express middleware to authenticate admin
   * @requestHeaders
   * - authorization: jwt string
   * @returns next function
   */
  isAdmin(req, res, next) {
    module.exports.isUser(req, res, () => {
      let admin = req.body.authenticatedUser
      if (admin.role !== 'admin') return res.status(401).send({ msg: "UNAUTHORIZED" })
      return next()
    })
  },
  /**
   * @description express middleware to authenticate user
   * @requestHeaders
   * - authorization: jwt string
   * @returns next function
   */
  isUser(req, res, next) {
    let jwtToken = req.headers.authorization
    try {
      let user = verifyToken(jwtToken)
      req.body.authenticatedUser = user
      return next()
    } catch (e) {
      return res.status(401).send({ code: "UNAUTHORIZED" })
    }
  },
  /**
   * @description Login
   * @requestBody
   * - email: string,
   * - password: string
   * @returns Object
   * - token
   * - email
   * - role
   */
  login: function(email, password) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM user WHERE email="${email}"`
      mysqlQuery(query)
        .then(async user => {
          if (!user.length) return reject({code: 'NOT_FOUND'})
          user = user[0]
          // compare password 
          if(await passwordIsCorrect(password, user.password)) {
            let token = generateToken({ email: user.email, role: user.role })
            return resolve({ token, email: user.email, role: user.role })
          }
        })
        .catch(e => console.log(e.code))
    })
  },
}