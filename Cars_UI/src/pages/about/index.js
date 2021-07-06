const About = () => {
  return (
    <div>
      <div className="containercontact">
        <div className="about-section">
          <h1>Vài nét về chúng tôi</h1>
          <br />
          <br />
          <h3>LUXURY CAR AND LUXURY LIFE</h3>
          <br />
          <h41>
            Với một mục tiêu luôn muốn đem những chiếc siêu xe, xe sang và siêu sang
            đến gần hơn với người dùng Việt Nam - Luxury Auto chắc chắn sẽ là địa
            chỉ tin cậy dành cho các tín đồ chơi xe trên khắp cả nước. Hãy đến với
            chúng tôi để trải nghiệm những dịch vụ tốt nhất những chiếc xe sang
            trọng nhất.
          </h41>
        </div>
      </div>
      <h2 style={{ textAlign: "center" }}>Đội ngũ phát triển</h2>
      <div className="row7" style={{ textAlign: "center" }}>
        <div className="column">
          <div className="card">
            <img
              src="Images/hien.jpg"
              alt="Hien"
              style={{ marginLeft: "65px", width: "345px", height: "235px" }}
            />
            <div className="container">
              <h2>CAN THI HIEN</h2>
              <p style={{ textAlign: "center" }}>Art Director</p>
              <p>0972183213</p>
              <p>canthihien@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <img
              src="Images/long.jpg"
              alt="Long"
              style={{ marginLeft: "65px", width: "345px", height: "235px" }}
            />
            <div className="container">
              <h2>NGUYEN DUC LONG</h2>
              <p style={{ textAlign: "center" }}>CEO &amp; Founder</p>
              <p>0976251470</p>
              <p>nguyenlong2162@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <img
              src="Images/dung.jpg"
              alt="Dung"
              style={{ marginLeft: "65px", width: "345px", height: "235px" }}
            />
            <div className="container">
              <h2>NGUYEN THUY DUNG</h2>
              <p style={{ textAlign: "center" }}>Designer</p>
              <p>0936407792</p>
              <p>dungcon1904@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About