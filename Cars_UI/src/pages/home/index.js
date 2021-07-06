import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCarsAsync } from "../../redux/actions/cars.action"
import formatNumber from "../../utils/formatNum"
import { Link } from "react-router-dom"

const Home = () => {
  const dispatch = useDispatch()
  const { cars } = useSelector(state => state.cars)

  useEffect(() => {
    dispatch(getAllCarsAsync({}))
  }, [])

  return (
    <div id='home'>
      <div className='my-container'>
        <div className="my-row">
          <div className="my-col-2">
            <h1>Luxury Car and Luxury Life</h1>
            <br />
            <p>
              Với một mục tiêu luôn muốn đem những chiếc siêu xe, xe sang và siêu
              sang đến
              <br /> gần hơn với người dùng Việt Nam - Luxury Auto chắc chắn sẽ là
              địa chỉ tin cậy <br /> dành cho các tín đồ chơi xe trên khắp cả nước.
              Hãy đến với chúng tôi để trải nghiệm <br />
              những dịch vụ tốt nhất những chiếc xe sang trọng nhất.
            </p>
            <br />
            <a href="/products" className="btn">
              Khám phá ngay →
            </a>
          </div>
          <div className="my-col-2">
            <img src="/images/image1.png" />
          </div>
        </div>
      </div>
      <div>
        <div className="small-container">
          <h2 className="title">Xe mới nhất</h2>
          <br />
          <div className="my-row">
            {
              cars?.length > 0 &&
              cars.map(item => (
                <div className="my-col-4">
                  <img style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 4 }} src={item?.images?.[0]?.url} />
                  <h4>
                    <Link style={{ marginTop: 12, marginBottom: 8, display: 'block', fontSize: '1.4rem', fontWeight: 'bolder' }} to={`/products/${item._id}`}>
                      {item.name}
                    </Link>
                  </h4>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                  </div>
                  <p>{formatNumber(item.price)}đ</p>
                </div>
              ))
            }
          </div>
          <div className="my-row">
            {
              cars?.length > 0 &&
              cars.reverse().slice(0, 4).map(item => (
                <div className="my-col-4">
                  <img style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} src={item?.images?.[0]?.url} />
                  <Link style={{ marginTop: 12, marginBottom: 8, display: 'block', fontSize: '1.4rem', fontWeight: 'bolder' }} to={`/products/${item._id}`}>
                    {item.name}
                  </Link>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                  </div>
                  <p>{formatNumber(item.price)}đ</p>
                </div>
              ))
            }
          </div>
        </div>
        {/*--------- offer---------*/}
        <div className="offer">
          <div className="small-ocntainer">
            <h2 className="title">Siêu xe đại diện cho LuxuryAuto</h2>
            <div className="my-row">
              <div className="my-row">
                <div className="my-col-2">
                  <img
                    src="/images/Bugatti La Voiture Noire.png"
                    className="offer-img"
                  />
                </div>
                <div className="my-col-2">
                  <p>Super car on LuxuryAuto</p>
                  <br />
                  <br />
                  <h1>Bugatti La Voiture Noire</h1>
                  <br />
                  <small>
                    Một trong những sáng tạo có 1 không 2 từ Bugatti nhằm tri ân chiếc
                    Type 57 SC Atlantic huyền thoại. Sau thuế, giá bán của chiếc siêu
                    xe Bugatti La Voiture Noire bậc nhất này có giá 18,68 triệu USD.
                    Đây là giá tham khảo tại thị trường Mỹ và châu Âu. Nếu như về Việt
                    Nam, bạn muốn sở hữu chiếc xe này thì có thể mất khoản chi phí gấp
                    4 lần. Đây cũng chính là chiếc xe thể thao có giá bán cao nhất
                    lịch sử siêu xe.
                  </small>
                  <br />
                  <a href="/products/60e4749c588e2e0e80bea1a6" className="btn">
                    Xem ngay →
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/*-------- brands --------*/}
          <div className="brands">
            <div className="small-container">
              <div className="my-row">
                <div className="my-col-5">
                  <img src="/images/logo-ferrari.png" />
                </div>
                <div className="my-col-5">
                  <img src="/images/logo-rollroy.png" />
                </div>
                <div className="my-col-5">
                  <img src="/images/logo-lambor.png" />
                </div>
                <div className="my-col-5">
                  <img src="/images/logo-bugati.png" />
                </div>
                <div className="my-col-5">
                  <img src="/images/logo-audi.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home