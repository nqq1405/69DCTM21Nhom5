import { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './static/styles/common.css'
import './static/styles/global.scss'
import './static/styles/sign.scss'
import './static/styles/header.admin.scss'
import './static/styles/sidebar.admin.scss'
import './static/styles/story.admin.scss'
import './static/styles/category.admin.scss'
import './static/styles/staff.admin.scss'
import './static/styles/client.admin.scss'
import './static/styles/responsive.admin.scss'
import './static/styles/main.scss'

import MainLayout from './layouts/main'
import Home from './pages/home'
import Login from './layouts/sign/Login'
import Register from './layouts/sign/Register'
import { authAsync } from './redux/actions/authen.actions'
import Admin from './layouts/admin'
import { getAllBrandsAsync } from './redux/actions/brands.actions'
import { getAllCarsAsync } from './redux/actions/cars.action'
import Product from './pages/product'
import About from './pages/about'
import Contact from './pages/contact'
import Search from './pages/search'
import Detail from './pages/detail'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    scrollTop()
    dispatch(authAsync())
  }, [])

  useEffect(() => {
    dispatch(getAllBrandsAsync({}))
  }, [])

  useEffect(() => {
    dispatch(getAllCarsAsync({}))
  }, [])

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <div className='my-app'>
      <button id='scroll-top' onClick={scrollTop}><i className="fas fa-arrow-up"></i></button>
      <Switch>
        <Route path='/admin'>
          <Admin />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/search'>
          <MainLayout>
            <Search />
          </MainLayout>
        </Route>
        <Route path='/contacts'>
          <MainLayout>
            <Contact />
          </MainLayout>
        </Route>
        <Route path='/about'>
          <MainLayout>
            <About />
          </MainLayout>
        </Route>
        <Route path='/products/:_id'>
          <MainLayout>
            <Detail />
          </MainLayout>
        </Route>
        <Route path='/products'>
          <MainLayout>
            <Product />
          </MainLayout>
        </Route>
        <Route path='/'>
          <MainLayout>
            <Home />
          </MainLayout>
        </Route>
      </Switch>
    </div>
  )
}

export default App
