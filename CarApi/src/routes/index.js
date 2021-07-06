const loginRouter = require('./login')
const authRouter = require('./auth')
const carRouter = require('./car')
const accountRouter = require('./account')
const brandRouter = require('./brand')

const create = require('../api/client/create')
const getAll = require('../api/client/getAll')

const route = (app) => {
  app.post('/api/clients', create)
  app.get('/api/clients', getAll)
  app.use('/api/auth', authRouter)
  app.use('/api/brands', brandRouter)
  app.use('/api/cars', carRouter)
  app.use('/api/accounts', accountRouter)
  app.use('/api/login', loginRouter)
}

module.exports = route