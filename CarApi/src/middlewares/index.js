const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const middleware = (app) => {
  app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, '../../public')))
  app.use(fileUpload())
}

module.exports = middleware