import { useRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBrandAsync } from '../../redux/actions/brands.actions'

const Create = ({ status, setCreateForm }) => {

  const dispatch = useDispatch()

  const nameEl = useRef(null)


  const handleSubmit = (e) => {
    e.preventDefault()

    const name = nameEl.current.value.trim()
    const data = {
      name: name
    }

    dispatch(createBrandAsync(data, setCreateForm(false)))

  }

  return (
    <>
      {
        status &&
        <div id='product-create'>
          <div className='create-container'>
            <form onSubmit={handleSubmit} className='create-form'>
              <span onClick={() => { setCreateForm(false) }} className='close'>
                <i className="fas fa-times"></i>
              </span>
              <div className='form-container'>
                <h4>Thêm hãng xe</h4>
                <div className='create-name'>
                  <label htmlFor='create_name'>Tên hãng: </label>
                  <input placeholder='VD: Mercedes' required ref={nameEl} id='create_name' name='major_name' />
                </div>
                <button className='sm-btn' type='submit'>Thêm</button>
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