import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllBrandsAsync } from "../../redux/actions/brands.actions"
import { getAllCarsAsync } from "../../redux/actions/cars.action"
import { Link } from "react-router-dom"
import formatNumber from "../../utils/formatNum"

const Product = () => {
  const dispatch = useDispatch()
  const { brands } = useSelector(state => state.brands)
  const { cars } = useSelector(state => state.cars)
  const [currentBrand, setCurrentBrand] = useState(null)

  useEffect(() => {
    dispatch(getAllCarsAsync({}))
  }, [])

  useEffect(() => {
    dispatch(getAllBrandsAsync({}))
  }, [])

  useEffect(() => {
    if (!currentBrand) {
      dispatch(getAllCarsAsync({ brand: currentBrand }))
      return
    }


    dispatch(getAllCarsAsync({ brand: currentBrand }))
  }, [currentBrand])

  return (
    <div>
      <div className="my-row row-2">
        <div className="title1">
          <h2> All Products</h2>
        </div>
      </div>
      <div className="wrapper">
        {/* filter Items */}
        <nav>
          <div className="items">
            <span onClick={() => setCurrentBrand(null)} className={`item ${!currentBrand ? 'active' : ''}`} data-name="all">
              All Cars
            </span>
            {
              brands?.length > 0 &&
              brands.map(item => (
                <span onClick={() => setCurrentBrand(item._id)} className={`item ${item._id === currentBrand ? 'active' : ''}`} data-name="all">
                  {item?.name}
                </span>
              ))
            }
          </div>
        </nav>
        {/* filter Images */}
        <div className="gallery">
          {
            cars?.length > 0 &&
            cars.map(item => (
              <div className="image" data-name="Audi">
                <span>
                  <img style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 4 }} src={item?.images?.[0]?.url} />
                </span>
                <Link style={{ marginTop: 12, marginBottom: 8, display: 'block', fontSize: '1.4rem', fontWeight: 'bolder' }} to={`/products/${item._id}`} >
                  {item.name}
                </Link>
                <span>Thương hiệu: {item.brand?.name}</span>
                <p>{formatNumber(item.price)} VND</p>
              </div>
            ))
          }
        </div>
      </div>
      {/* fullscreen img preview box */}
      <div className="preview-box">
        <div className="details">
          <span className="title">
            Image Category: <p />
          </span>
          <span className="icon fas fa-times" />
        </div>
        <div className="image-box">
          <img src alt="" />
        </div>
      </div>
      <div className="shadow" />
    </div>
  )
}

export default Product