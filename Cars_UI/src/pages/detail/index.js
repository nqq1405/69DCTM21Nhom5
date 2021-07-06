import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getOneCar } from "../../services/stories.services"
import formatNumber from "../../utils/formatNum"
import { useDispatch, useSelector } from "react-redux"
import { getAllCarsAsync } from "../../redux/actions/cars.action"
import { Link } from "react-router-dom"

const Detail = () => {
  const { _id } = useParams()
  const dispatch = useDispatch()
  const [car, setCar] = useState({})
  const { cars } = useSelector(state => state.cars)
  const [currentImages, setCurrentImages] = useState('')
  const { images } = car

  useEffect(() => {
    getOneCar(_id)
      .then(res => {
        if (res.data && res.data.status) {
          setCar(res.data.car)
        } else {
          alert(res.data.message)
        }
      })
      .catch(err => alert('ERROR: ' + err))
  }, [_id])

  useEffect(() => {
    dispatch(getAllCarsAsync({ brand: car?.brand?._id || null }))
  }, [car])

  useEffect(() => {
    if (!images?.length > 0)
      return

    setCurrentImages(images[0]?.url)

  }, [car])

  return (
    <>
      <div className="small-container single-product">
        <div className="my-row">
          <div className="my-col-2">
            <img
              src={currentImages}
              style={{
                width: '100%',
                aspectRatio: '1',
                objectFit: 'cover'
              }}
              id="ProductImg"
            />
            <div className="small-img-row" style={{ marginTop: 16 }}>
              {
                images?.length > 0 &&
                images.map(item => (
                  <div onClick={() => setCurrentImages(item.url)} className="small-img-col">
                    <img
                      src={item.url}
                      style={{
                        width: '100%',
                        aspectRatio: '4/3',
                        objectFit: 'cover'
                      }}
                      className="small-img"
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="my-col-2">
            <h1>{car.name}</h1>
            <h4>{formatNumber(car.price)} VND</h4>
            <h3>Thông tin xe</h3>
            <br />
            <p>
              {" "}
              Trọng lượng (kg): {car.weight}
              <br />
              <br />
              Tốc độ tối đa (km/h): {car.maxSpeed}
              <br />
              <br />
              Gia tốc (0-100km/h): {car.accel}
              <br />
              <br />
              Công suất cực đại (hp): {car.maxWattage}
              <br />
              <br />
              Công suất/Trọng lượng (hp/ton): {car.weightAndWattage}
              <br />
              <br />
              Dung tích xi-lanh (cc): {car.cylinder}
              <br />
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="small-container">
          <div className="row row-2">
            <h1>Xe tương tự</h1>
          </div>
        </div>
        <div className="small-container">
          <div className="my-row">
            {
              cars?.length > 0 &&
              cars.map(item => (
                <div className="my-col-4">
                  <img style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 4 }} src={item?.images?.[0]?.url} />
                  <Link style={{ marginTop: 12, marginBottom: 8, display: 'block', fontSize: '1.4rem', fontWeight: 'bolder' }} to={`/products/${item._id}`} >
                    {item.name}
                  </Link>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                  </div>
                  <span>Thương hiệu: {item.brand?.name}</span>
                  <p>{formatNumber(item.price)} VND</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Detail