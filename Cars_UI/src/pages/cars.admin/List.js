import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DeletePopup from '../../global/DeletePopup'
import Warning from '../../global/Warning'
import { removeCarAsync } from '../../redux/actions/cars.action'
import formatNumber from '../../utils/formatNum'

const StoriesList = ({ setUpdateForm }) => {
  const { cars } = useSelector(state => state.cars)
  const [popup, setPopup] = useState({
    status: false,
    title: null,
    id: null
  })

  const dispatch = useDispatch()

  const deleteCar = (_id, images) => {
    setPopup({
      status: false,
      title: null,
      id: null
    })
    dispatch(removeCarAsync(_id, images ))
  }

  const openPopup = (id, title, images) => {
    setPopup({
      status: true,
      id,
      title,
      images
    })
  }

  const closePopup = () => {
    setPopup({
      status: false,
      title: null,
      id: null,
      images: []
    })
  }

  return (
    <div id='client-list'>
      <DeletePopup closePopup={closePopup} action={deleteCar} status={popup.status} title={popup.title} id={popup.id} images={popup.images} />
      <div className='client-list-container'>
        {
          cars?.length > 0 &&
          <ul>
            <li className='title-row'>
              <div className='info'>
                <span style={{ width: '60%', textAlign: 'center' }}>Tên</span>
                <span style={{ width: '40%', textAlign: 'center' }}>Hãng</span>
                <span style={{ width: '40%', textAlign: 'center' }}>Giá</span>
                {/* <span style={{ width: '40%', textAlign: 'center' }}>công suất</span> */}
              </div>
              <div className='tools'>
                <span>Sửa</span>
                <span>Xóa</span>
              </div>
            </li>
            {
              cars.map((item, index) => {
                return (
                  <li key={item._id}>
                    <div className='info'>
                      <span className='name'>
                        {item.name}
                      </span>
                      <span className='school'><strong style={{ color: !item.brand?.name && 'red' }}>{item.brand?.name || 'Chưa cập nhật'}</strong></span>
                      <span className='school'><strong style={{ color: !item.price && 'red' }}>{item.price ? formatNumber(item.price)+'đ' : 'Chưa cập nhật'}</strong></span>
                      {/* <span className='school' style={{ cursor: 'pointer' }}>{item.maxWattage}</span> */}
                    </div>
                    <div className='tools'>
                      <button className='edit' onClick={() => setUpdateForm({ status: true, info: item, index: index })}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => openPopup(item._id, `Xác nhận xóa xe "${item.name}"`, item.images)} className='remove'>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </li>
                )
              })
            }
          </ul>
          ||
          <Warning alert='Chưa có xe nào!' />
        }
      </div>
    </div>
  )
}

export default StoriesList