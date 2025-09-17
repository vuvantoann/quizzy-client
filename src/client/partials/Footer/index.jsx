import './Footer.scss'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__branding">
          <div className="footer__logo">QUIZZY</div>
          <p>Challenge your mind, test your knowledge</p>
          <div className="footer__status">
            <span className="status-dot"></span>
            <span>Platform running smoothly</span>
          </div>
        </div>

        <div className="footer__links">
          <div className="footer__column">
            <a href="#">Quizzes</a>
            <a href="#">Categories</a>
            <a href="#">Leaderboard</a>
            <a href="#">Blog</a>
            <a href="#">About Us</a>
          </div>
          <div className="footer__column">
            <a href="#">Help Center</a>
            <a href="#">FAQs</a>
            <a href="#">Support</a>
          </div>
          <div className="footer__column">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">YouTube</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2025 QUIZZY. All rights reserved.</p>
        <div className="footer__bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
