const bcrypt = require('bcryptjs')

const hashPass = (password) => bcrypt.hashSync(password)
const comparePass = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword)

module.exports = { hashPass, comparePass }