import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Pagination from '../../global/Pagination'
import Warning from '../../global/Warning'
// import { removeCategoryAsync } from '../../redux/actions/brands.actions'
import DeletePopup from '../../global/DeletePopup'
import { removeBrandAsync } from '../../redux/actions/brands.actions'

const CategoriesList = ({ setUpdateForm, setCategoryInfo }) => {
  const { brands } = useSelector(state => state.brands)
  const categoryPage = {}
  const dispatch = useDispatch()

  const [popup, setPopup] = useState({
    status: false,
    title: null,
    id: null
  })


  const deleteBrand = (_id) => {
    setPopup({
      status: false,
      title: null,
      id: null
    })
    dispatch(removeBrandAsync(_id))
  }

  const changePage = (page) => {
    // dispatch(getAllProductsAsync({ page }))
  }

  const openPopup = (id, title) => {
    setPopup({
      status: true,
      id,
      title
    })
  }

  const closePopup = () => {
    setPopup({
      status: false,
      title: null,
      id: null
    })
  }

  return (
    <div id='product-list'>
      <DeletePopup closePopup={closePopup} action={deleteBrand} status={popup.status} title={popup.title} id={popup.id} />
      <div className='product-list-container'>
        {
          brands && brands.length > 0 &&
          <ul>
            <li className='title-row'>
              <div className='count'>
                <span>STT</span>
              </div>
              <div className='info'>
                <span>Tên</span>
              </div>
              <div className='tools'>
                <span>Sửa</span>
                <span>Xóa</span>
              </div>
            </li>
            {
              brands.map((item, index) => {
                return (
                  <li key={item._id}>
                    <div className='count'>
                      <span>{index + 1}</span>
                    </div>
                    <div className='info'>
                      <span className='name' onClick={() => setCategoryInfo({ status: true, info: item })}>
                        {item.name}
                      </span>
                    </div>
                    <div className='tools'>
                      <button className='edit' onClick={() => setUpdateForm({ status: true, info: item, index })}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => openPopup(item._id, `Xác nhận xóa chuyên mục "${item.name}"`)} className='remove'>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </li>
                )
              })
            }
          </ul>
          ||
          <Warning alert='Chưa có chuyên mục!' />
        }
      </div>
      <div className='client-pagination'>
        <Pagination totalPage={categoryPage.totalPage} currentPage={categoryPage.currentPage} changePage={changePage} />
      </div>
    </div>
  )
}

export default CategoriesList