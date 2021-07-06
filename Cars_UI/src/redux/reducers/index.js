import { combineReducers } from 'redux'
import brandsReducer from './brands.reducer'
import clientsReducer from './clients.reducer'
import carsReducer from './cars.reducer'
import usersReducer from './users.reducer'
import webReducer from './web.reducer'

const rootReducer = combineReducers({
  clients: clientsReducer,
  brands: brandsReducer,
  users: usersReducer,
  cars: carsReducer,
  web: webReducer
})

export default rootReducer