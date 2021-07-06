import { useState, useRef, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import { getAllUsersAsync, toggleLoading } from '../../redux/actions'
// import { createUser } from '../../services/global'
import toChar from '../../utils/toChar'
import { createCarAsync } from '../../redux/actions/cars.action'

const Create = ({ status, setCreateForm }) => {
  const dispatch = useDispatch()
  const { brands } = useSelector(state => state.brands)

  const [images, getImages] = useState([])

  const nameEl = useRef(null)
  const brandEl = useRef(null)
  const priceEl = useRef(null)
  const weightEl = useRef(null)
  const maxSpeedEl = useRef(null)
  const maxWattageEl = useRef(null)
  const accelEl = useRef(null)
  const weightAndWattageEl = useRef(null)
  const cylinderEl = useRef(null)

  const handleChange = (e) => {
    const selectedFile = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = (e) => {
      const url = reader.result
      getImages([...images, url])
    }

    if (selectedFile && selectedFile.type.match('image.*')) {
      reader.readAsDataURL(selectedFile)
    }
  }

  const deleteImage = (index) => {
    const newImages = [...images]
    getImages([
      ...newImages.slice(0, index),
      ...newImages.slice(index + 1)
    ])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = nameEl?.current.value
    const text = toChar(name)
    const brand = brandEl?.current.value !== 'none' ? brandEl?.current.value : null
    if (!brand) 
      return alert('Hãng xe không hợp lệ!')
    const price = priceEl?.current.value || 0
    const weight = weightEl?.current.value
    const maxSpeed = maxSpeedEl?.current.value
    const maxWattage = maxWattageEl?.current.value
    const accel = accelEl?.current.value
    const weightAndWattage = weightAndWattageEl?.current.value
    const cylinder = cylinderEl?.current.value

    const formData = new FormData()
    formData.append('text', text)
    formData.append('name', name)
    formData.append('brand', brand)
    formData.append('price', price)
    formData.append('weight', weight)
    formData.append('maxSpeed', maxSpeed)
    formData.append('maxWattage', maxWattage)
    formData.append('accel', accel)
    formData.append('weightAndWattage', weightAndWattage)
    formData.append('cylinder', cylinder)
    formData.append('images', images.join(' '))

    dispatch(createCarAsync(formData, () => {
      setCreateForm(false)
    }))
  }

  return (
    <>
      {
        status &&
        <div id='client-create'>
          <div className='create-container scroll'>
            <form onSubmit={handleSubmit} className='create-form' style={{ maxHeight: '100vh', overflowY: 'scroll' }}>
              <span onClick={() => { setCreateForm(false) }} className='close'>
                <i className="fas fa-times"></i>
              </span>
              <h4>Thêm xe mới</h4>
              <div className='form-container container' >
                <div title='chọn ảnh đại diện' className='file-upload'>
                  {
                    images?.length > 0 &&
                    images.map((item, index) => (
                      <div className='image-container uploaded'>
                        <span onClick={() => deleteImage(index)} className='delete-btn'><i className="fas fa-times"></i></span>
                        <img src={item} />
                      </div>
                    ))
                  }
                  {
                    images?.length < 4 &&
                    <div className='image-container'>
                      <div className='wrapper'>
                        <img src='/images/product_default_img.png' />
                        <label htmlFor='product_image'>
                          <i className="fas fa-camera"></i>
                          <input onChange={handleChange} hidden type='file' id='product_image' />
                        </label>
                      </div>
                    </div>
                  }
                </div>
                <div className='create-name'>
                  <label htmlFor='create_name'>Tên xe: </label>
                  <input required ref={nameEl} id='create_name' />
                </div>
                <div className='create-name'>
                  <strong>Chuyên mục:</strong>
                  <select required defaultValue='none' ref={brandEl} >
                    <option value="none" disabled hidden>-- Chọn hãng --</option>
                    {
                      brands?.length > 0 &&
                      brands.map((item, index) => (
                        <option value={item._id}>{item.name}</option>
                      ))
                    }
                  </select>
                </div>
                <div className='create-cate'>
                  <label htmlFor='create_cate'>Giá: </label>
                  <input type='number' min={1} required ref={priceEl} id='create_cate' />
                </div>
                <div className='create-cate'>
                  <label htmlFor='create_cate'>Trọng lượng: </label>
                  <input type='number' min={1} required ref={weightEl} id='create_cate' />
                </div>
                <div className='create-cate'>
                  <label htmlFor='create_cate'>Tốc độ: </label>
                  <input type='number' min={1} required ref={maxSpeedEl} id='create_cate' />
                </div>
                <div className='create-cate'>
                  <label htmlFor='create_cate'>Công suất: </label>
                  <input type='number' min={1} required ref={maxWattageEl} id='create_cate' />
                </div>
                <div className='create-cate'>
                  <label htmlFor='create_cate'>Tăng tốc 100km/h: </label>
                  <input type='number' min={1} required ref={accelEl} id='create_cate' />
                </div>
                <div className='create-cate'>
                  <label htmlFor='create_cate'>Công: </label>
                  <input type='number' min={1} required ref={weightAndWattageEl} id='create_cate' />
                </div>
                <div className='create-cate'>
                  <label htmlFor='create_cate'>Dung tích Xi-lanh: </label>
                  <input type='number' min={1} required ref={cylinderEl} id='create_cate' />
                </div>
                <button type='submit'>Submit</button>
              </div>
            </form>
          </div>
        </div>
        ||
        null
      }
    </>
  )
}

export default Create