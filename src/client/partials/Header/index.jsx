import { Link, NavLink, useLocation } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'

import './Header.scss'

function Header() {
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
            <li className="header__nav-item">
              <NavLink to="/topic" className="header__nav-link">
                Topic
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink to="/practice" className="header__nav-link">
                Practice
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink to="/result" className="header__nav-link">
                Result
              </NavLink>
            </li>

            <li className="header__icon">
              <CiSearch />
            </li>
            <li className="header__icon ">Đăng nhập/ Đăng ký</li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
