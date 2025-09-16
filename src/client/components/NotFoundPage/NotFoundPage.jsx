import React from 'react'
import { Link } from 'react-router-dom'
import './NotFoundPage.scss'

function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="not-found__code">404</div>
      <h1 className="not-found__title">Oops, This Page Not Found!</h1>
      <p className="not-found__description">
        The link might be corrupted, <br /> or the page may have been removed
      </p>
      <Link to="/" className="not-found__button">
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFoundPage
