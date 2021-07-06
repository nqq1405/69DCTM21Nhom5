const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Account = new Schema({
  username: { type: String, maxLength: 69 },
  password: { type: String, maxLength: 30 },
  fullName: { type: String, maxLength: 128 },
  email: { type: String, maxLength: 100 },
  role: { type: String, default: 'staff' },
  phone: { type: String },
  text: { type: String, default: "" }
})

module.exports = mongoose.model('account', Account)