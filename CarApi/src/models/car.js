const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)
const Schema = mongoose.Schema

const Car = new Schema({
  name: { type: String, maxLength: 255 },
  brand: { type: String, ref: 'brand' },
  price: { type: Number },
  weight: { type: String },
  maxSpeed: { type: Number },
  maxWattage: { type: Number },
  accel: { type: Number },
  weightAndWattage: { type: Number },
  cylinder: { type: Number },
  description: { type: String },
  images: { type: Array, default: [] },
  slug: { type: String, slug: "title" },
  text: { type: String }
}, {
  timestamps: true
})

module.exports = mongoose.model('car', Car)