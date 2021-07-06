import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../../services/users.services'
import { toggleLoading } from "../../redux/actions/web.actions"
import toChar from '../../utils/toChar'
import { emailValidate, nameValidate, usernameValidate, phoneValidate } from '../../utils/validate'

const Update = ({ updateForm, setUpdateForm }) => {
  const { info } = updateForm

  const { users } = useSelector(state => state.users)
  const dispatch = useDispatch()

  const [emailErr, logEmailErr] = useState(false)
  const [usernameErr, logUsernameErr] = useState(false)
  const [fullNameErr, logFullNameErr] = useState(false)
  const [phoneNumberErr, logPhoneNumberErr] = useState(false)

  const [passErr, logPassErr] = useState(false)

  const [userData, setUserData] = useState({})

  const nameEl = useRef(null)
  const mailEl = useRef(null)
  const phoneEl = useRef(null)
  const usernameEl = useRef(null)
  const passwordEl = useRef(null)

  const emailValidation = (e) => {
    let value = e.target.value || ''
    value = value.trim()
    setUserData({
      ...userData,
      email: value
    })

    if (value !== '') {
      logEmailErr(!emailValidate(value))
    } else {
      logEmailErr(false)
    }
  }

  const phoneNumberValidate = (e) => {
    let value = e.target.value || ''
    value = value.trim()
    setUserData({
      ...userData,
      phone: value
    })

    if (value !== '') {
      logPhoneNumberErr(!phoneValidate(value))
    } else {
      logPhoneNumberErr(false)
    }
  }

  const usernameValidation = (e) => {
    let value = e.target.value || ''
    value = value.trim()
    setUserData({
      ...userData,
      username: value
    })

    if (value !== '') {
      logUsernameErr(!usernameValidate(value))
    } else {
      logUsernameErr(false)
    }
  }

  const fullNameValidation = (e) => {
    let value = e.target.value || ''
    value = value.trim()
    setUserData({
      ...userData,
      fullName: value
    })

    if (value !== '') {
      logFullNameErr(!nameValidate(value))
    } else {
      logFullNameErr(false)
    }
  }

  const passValidation = (e) => {
    let value = e.target.value || ''
    value = value.trim()
    setUserData({
      ...userData,
      password: value
    })

    if (value !== '') {
      if (value.length < 6) {
        logPassErr(true)
      } else {
        logPassErr(false)
      }

    } else {
      logPassErr(false)
    }
  }

  const checkValidate = () => {
    if (!emailErr && !usernameErr && !fullNameErr && !passErr) {
      return true
    } else return false
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!checkValidate()) return alert('Vui lòng điền thông tin hợp lệ!')

    const fullName = nameEl.current.value.trim()
    // const id = idEl.current.value.trim()
    const phone = phoneEl.current.value.trim()
    const email = mailEl.current.value.trim()
    const username = usernameEl.current.value.trim()
    const password = passwordEl.current.value.trim()
    const text = toChar(fullName)

    let checkUsername = false
    users.forEach(item => {
      if (item.username == username && item.username !== info.username) {
        checkUsername = true
      }
    })

    if (checkUsername) return alert('Username đã tồn tại!')
    const data = {
      fullName, text, email, phone, username, password
    }

    dispatch(toggleLoading(true))
    updateUser(info._id, data)
      .then(res => {
        if (res.data && res.data.status) {
          setUpdateForm({ status: false, info: {} })
          alert(res.data.message)
          dispatch({
            type: 'UPDATE_USER',
            payload: res.data.newStaff
          })
        } else {
          alert('Error: ' + res.data.message)
        }
      })
      .catch(err => {
        // dispatch(triggerNotif({
        //   type: 'ERROR',
        //   content: 'SERVER_ERROR!'
        // }))
      })
      .then(() => {
        dispatch(toggleLoading(false))
      })
  }

  return (
    <>
      {
        updateForm.status &&
        <div id='staff-create'>
          <div className='create-container'>
            <form onSubmit={handleSubmit} className='create-form'>
              <span onClick={() => { setUpdateForm({ status: false, info: {} }) }} className='close'>
                <i className="fas fa-times"></i>
              </span>
              <h4>Chỉnh sửa nhân viên</h4>
              <div className='form-container container'>
                <div className='create-name'>
                  <label htmlFor='create_name'>Họ Tên: </label>
                  <input defaultValue={info.fullName} onChange={fullNameValidation} required className={fullNameErr ? 'error' : ''} ref={nameEl} id='create_name' />
                </div>
                <div className='create-phone'>
                  <label htmlFor='create_phone'>SĐT: </label>
                  <input defaultValue={info.phone} onChange={phoneNumberValidate} className={phoneNumberErr ? 'error' : ''} required ref={phoneEl} id='create_phone' />
                </div>
                <div className='create-mail'>
                  <label htmlFor='create_mail'>email: </label>
                  <input defaultValue={info.email} onChange={(e) => emailValidation(e)} className={emailErr ? 'error' : ''} required ref={mailEl} id='create_mail' />
                </div>
                <div className='create-username'>
                  <label htmlFor='create_username'>Tài khoản: </label>
                  <input defaultValue={info.username} onChange={(e) => usernameValidation(e)} className={usernameErr ? 'validate-error' : ''} required ref={usernameEl} id='create_username' />
                </div>
                <div className='create-password'>
                  <label htmlFor='create_password'>Mật khẩu: </label>
                  <input defaultValue={info.password} onChange={passValidation} className={passErr ? 'error' : ''} required ref={passwordEl} id='create_password' />
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