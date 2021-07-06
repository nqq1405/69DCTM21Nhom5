const Footer = () => {
  return (
    <div className="footer" >
      <div className="my-container">
        <div className="my-row">
          <div className="footer-col-1">
            <h3>Contact:</h3>
            <p>CEO of LuxuryAuto: Nguyen Duc Long</p>
            <div className="app-logo">
              <img src="/images/gmail.png" />
              Gmail: longnguyenCEO@gmail.com
              <p />
              <br />
              <br />
              <img src="/images/icon-phone.png" />
              Phone: 0988999888
              <p />
            </div>
          </div>
          <div className="footer-col-2">
            <img src="/images/logo-white.png" />
            <p>Contact us:</p>
            <br />
            <br />
            <p>
              Địa chỉ: Số 54 Triều Khúc,quận Thanh Xuân, thành phố Hà Nội{" "}
              <br />
              <br />
              {" "}
              Số điện thoai: 0986888666
              <br />
              <br />
              Email: LuxuryAuto9999@gmail.com{" "}
            </p>
          </div>
          <div className="footer-col-4">
            <h3>Follow us</h3>
            <ul>
              <li>Facebook: LuxuryAuto</li>
              <li>Instagram: @luxuryauto</li>

            </ul>

          </div>
        </div>
        <hr />
        <p className="copyright">Copyright LuxuryAuto 2021</p>
      </div>
    </div >
  )
}

export default Footer