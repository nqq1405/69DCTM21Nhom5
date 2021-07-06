import { getAllCarsAsync } from "../../redux/actions/cars.action"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import formatNumber from "../../utils/formatNum"
const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Search = () => {
  const { cars } = useSelector(state => state.cars)
  const dispatch = useDispatch()

  const param = useQuery().get('q')

  useEffect(() => {
    dispatch(getAllCarsAsync({ search: param }))
  }, [param])

  return (
    <div>
      <div className="my-row row-2">
        <div className="title1">
          <h2>Tìm kiếm "{param}"</h2>
        </div>
      </div>
      <div className="wrapper">
        {/* filter Items */}
        {/* filter Images */}
        <div className="gallery">
          {
            cars?.length > 0 &&
            cars.map(item => (
              <div className="image" data-name="Audi">
                <span>
                  <img style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 4 }} src={item?.images?.[0]?.url} />
                </span>
                <Link style={{ marginTop: 12, marginBottom: 8, display: 'block', fontSize: '1.4rem', fontWeight: 'bolder' }} to=''>
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

export default Search