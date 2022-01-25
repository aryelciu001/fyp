module.exports = {
  randomCodeGen: () => {
    let code = ''
    let n
    for (let i = 0; i<6; i++) {
      n = Math.floor(Math.random() * 10)
      code += String(n)
    }
    return code
  }
}