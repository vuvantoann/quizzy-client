import { Outlet } from 'react-router-dom'
import Footer from '../../partials/Footer'
import Header from '../../partials/Header'

function LayoutDefault() {
  return (
    <>
      <Header />
      <main
        className="main"
        // style={{
        //   marginTop: '150px',
        // }}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default LayoutDefault
