import { useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import toChar from '../../utils/toChar'

const Header = () => {
  const param = useRef(null)
  const history = useHistory()

  const submit = (e) => {
    e.preventDefault()
    let value = param?.current?.value
    history.replace(`/search?q=${toChar(value)}`)
  }

  return (
    <>
      <div className="header">
        <div className="my-container">
          <div className="navbar">
            <div className="logo">
              <a href="/">
                {" "}
                <img src="/images/logo.png" style={{
                  width: '200px',
                  paddingTop: 20,
                  paddingBottom: 20,
                  display: 'inline-block'
                }} />
              </a>
            </div>
            <form onSubmit={submit} style={{ marginLeft: '32px', display: 'inline-block' }}>
              <input ref={param} name='q' placeholder='Tìm kiếm...' />
            </form>
            <form style={{ marginLeft: '12px'}}>
            <img src="/images/search.png" width="30px" height="30px" />
            </form>
            <nav>
              <ul id="MenuItems">
                <li>
                  <Link to='/'>Trang chủ</Link>
                </li>
                <li>
                  <Link to="/products">Showroom</Link>
                </li>
                <li>
                  <Link to="/about">Giới thiệu</Link>
                </li>
                <li>
                  <Link to="/contacts">Liên hệ</Link>
                </li>
                {/* <li><Link to="account.html">Tài khoản</Link></li> */}
              </ul>
            </nav>
           
            <img src="/images/menu.png" className="menu-icon" onclick="menutoggle()" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header