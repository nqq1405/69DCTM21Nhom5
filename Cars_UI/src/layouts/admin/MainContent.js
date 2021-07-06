import { Route, Switch } from 'react-router-dom'
import Header from './Header'
import Story from '../../pages/cars.admin'
import Category from '../../pages/brands.admin'
import Staff from '../../pages/staffs.admin'
import Client from '../../pages/clients.admin'
const MainContent = () => {
  return (
    <>
      <Header />
      <div id='main-content'>
        <Switch>
          <Route path='/admin/clients'>
            <Client />
          </Route>
          <Route path='/admin/staffs'>
            <Staff />
          </Route>
          <Route path='/admin/cars'>
            <Story />
          </Route>
          <Route path='/admin/brands'>
            <Category />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default MainContent