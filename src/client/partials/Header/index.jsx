import { Link, NavLink, useLocation } from 'react-router-dom'

import './Header.scss'
import { getCookie } from '../../../helpers/cookie'
import { useSelector } from 'react-redux'

function Header() {
  const token = getCookie('token')
  const isLogin = useSelector((state) => state.loginReducer)

  return (
    <header className="header header--solid">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">QUIZZY</Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <NavLink to="/" className="header__nav-link">
                Home
              </NavLink>
            </li>
            {token && (
              <>
                <li className="header__nav-item">
                  <NavLink to="/topic" className="header__nav-link">
                    Topic
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <NavLink to="/answer" className="header__nav-link">
                    Answer
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <ul className="header__auth">
            <li className="header__nav-item ">
              {token ? (
                <>
                  <NavLink to="/logout" className="header__nav-link">
                    Đăng xuất
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="header__nav-link">
                    Đăng nhập/ Đăng ký
                  </NavLink>
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
