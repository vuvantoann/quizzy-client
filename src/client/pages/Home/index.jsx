import './Home.scss'
import heroBg from '../../../assets/img-bg-hero.webp'
import { Link } from 'react-router-dom'
import { getCookie } from '../../../helpers/cookie'

function Home() {
  const token = getCookie('token')
  return (
    <div className="home" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="home__overlay">
        <h1 className="home__title">Nền Tảng thi trắc nghiệm số 1 </h1>
        <p className="home__subtitle">
          Ôn tập dễ dàng, tạo, quản lý và chia sẻ bộ đề nhanh chóng.
        </p>
        <div className="home__actions">
          <Link to={token ? `/topic` : `/login`}>
            <button className="home__btn home__btn--primary">
              Bắt đầu ngay
            </button>
          </Link>
          <button className="home__btn home__btn--secondary">
            Tìm hiểu thêm
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
