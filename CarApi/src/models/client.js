const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)
const Schema = mongoose.Schema

const User = new Schema({
  fullName: { type: String, maxLength: 128 },
  email: { type: String, maxLength: 100 },
  phone: { type: String },
  address: { type: String },
  message: { type: String },
  text: { type: String, default: "" },
  slug: { type: String, slug: "title" },
})

module.exports = mongoose.model('user', User)