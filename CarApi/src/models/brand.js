const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)
const Schema = mongoose.Schema

const Brand = new Schema({
  name: { type: String, maxLength: 255 },
  slug: { type: String, slug: "name" },
  text: { type: String }
}, {
  timestamps: true
})

module.exports = mongoose.model('brand', Brand)