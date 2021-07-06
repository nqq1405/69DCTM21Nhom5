import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateCarAsync } from '../../redux/actions/cars.action'
import { toggleLoading } from '../../redux/actions/web.actions'

import toChar from '../../utils/toChar'

const Update = ({ updateForm, setUpdateForm }) => {
  const dispatch = useDispatch()
  const { brands } = useSelector(state => state.brands)
  const { cars } = useSelector(state => state.cars)

  const [newImages, setNewImages] = useState([])
  const [currentImages, setCurrentImages] = useState([])
  const [deletedImages, setDeletedImages] = useState([])

  const { info, index } = updateForm
  const nameEl = useRef(null)
  const brandEl = useRef(null)
  const priceEl = useRef(null)
  const weightEl = useRef(null)
  const maxSpeedEl = useRef(null)
  const maxWattageEl = useRef(null)
  const accelEl = useRef(null)
  const weightAndWattageEl = useRef(null)
  const cylinderEl = useRef(null)

  useEffect(() => {
    if (info.images?.length > 0)
      setCurrentImages([...info.images].reverse())
  }, [info])

  const handleChange = (e) => {
    const selectedFile = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = (e) => {
      const url = reader.result
      setNewImages([...newImages, url])
    }

    if (selectedFile && selectedFile.type.match('image.*')) {
      reader.readAsDataURL(selectedFile)
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    const name = nameEl?.current.value
    const text = toChar(name)

    let check = false
    cars.forEach(item => {
      if (item._id !== info._id && text === item.text)
        check = true
    })

    if (check)
      return alert('Tên xe đã tồn tại!')

    const brand = brandEl?.current.value
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
    formData.append('currentImages', JSON.stringify(currentImages))
    formData.append('newImages', newImages.join(' '))
    formData.append('deletedImages', deletedImages.join(' '))

    dispatch(updateCarAsync(info._id, formData, index, setUpdateForm({ status: false, info: {} })))

  }

  const deleteImage = (index) => {
    const currentImgs = [...currentImages]
    setCurrentImages([
      ...currentImgs.slice(0, index),
      ...currentImgs.slice(index + 1)
    ])

    setDeletedImages([
      ...deletedImages,
      currentImgs[index].publicId
    ])
  }

  const deleteNewImage = (index) => {
    const temp = [...newImages]
    setNewImages([
      ...temp.slice(0, index),
      ...temp.slice(index + 1)
    ])
  }


  return (
    <>
      {
        updateForm.status &&
        <div id='client-create'>
          <div className='create-container'>
            <form style={{ maxHeight: '100vh', overflowY: 'scroll' }} onSubmit={handleSubmit} className='create-form'>
              <span onClick={() => { setUpdateForm({ status: false, info: {} }) }} className='close'>
                <i className="fas fa-times"></i>
              </span>
              <h4>Chỉnh sửa xe</h4>
              <div className='form-container container'>
                <div title='chọn ảnh đại diện' className='file-upload'>
                  {
                    currentImages?.length > 0 &&
                    currentImages.map((item, index) => (
                      <div className='image-container uploaded'>
                        <span onClick={() => deleteImage(index)} className='delete-btn'><i className="fas fa-times"></i></span>
                        <img src={item.url} />
                      </div>
                    ))
                  }
                  {
                    newImages?.length > 0 &&
                    newImages.map((item, index) => (
                      <div className='image-container uploaded'>
                        <span onClick={() => deleteNewImage(index)} className='delete-btn'><i className="fas fa-times"></i></span>
                        <img src={item} />
                      </div>
                    ))
                  }
                  {
                    (currentImages?.length + newImages?.length) < 4 &&
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
                  <input defaultValue={info.name} required ref={nameEl} id='create_name' />
                </div>
                <div className='create-name'>
                  <strong>Chuyên mục:</strong>
                  <select defaultValue={info.brand?._id} required ref={brandEl} >
                    <option value="none" disabled hidden>-- Chọn hãng --</option>
                    {
                      brands?.length > 0 &&
                      brands.map((item, index) => (
                        <option selected={item._id === info.brand?._id} value={item._id}>{item.name}</option>
                      ))
                    }
                  </select>
                </div>
                <div className='create-cate'>
                  <label htmlFor='create_cate'>Giá: </label>
                  <input defaultValue={info.price} type='number' min={1} required ref={priceEl} id='create_cate' />
                </div>
                <div className='create-cate'>
                  <label htmlFor='create_cate'>Trọng lượng: </label>
                  <input defaultValue={info.weight} type='number' min={1} required ref={weightEl} id='create_cate' />
                </div>
                <div className='create-cate'>
                  <label htmlFor='create_cate'>Tốc độ: </label>
                  <input defaultValue={info.maxSpeed} type='number' min={1} required ref={maxSpeedEl} id='create_cate' />
                </div>
                <div className='create-cate'>
                  <label htmlFor='create_cate'>Công suất: </label>
                  <input type='number' defaultValue={info.maxWattage} min={1} required ref={maxWattageEl} id='create_cate' />
                </div>
                <div className='create-cate'>
                  <label htmlFor='create_cate'>Tăng tốc 100km/h: </label>
                  <input type='number' min={1} defaultValue={info.accel} required ref={accelEl} id='create_cate' />
                </div>
                <div className='create-cate'>
                  <label htmlFor='create_cate'>Công: </label>
                  <input type='number' min={1} defaultValue={info.weightAndWattage} required ref={weightAndWattageEl} id='create_cate' />
                </div>
                <div className='create-cate'>
                  <label htmlFor='create_cate'>Dung tích Xi-lanh: </label>
                  <input type='number' min={1} defaultValue={info.cylinder} required ref={cylinderEl} id='create_cate' />
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

export default Update