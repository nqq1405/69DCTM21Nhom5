import { useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import { getAllUsersAsync } from "../../redux/actions/users.actions"
import { toggleLoading } from "../../redux/actions/web.actions"
import { createUser } from "../../services/users.services"
import toChar from "../../utils/toChar"
import {
  emailValidate,
  nameValidate,
  usernameValidate,
  phoneValidate,
} from "../../utils/validate"

const Create = ({ createForm, setCreateForm }) => {
  const dispatch = useDispatch()

  const [emailErr, logEmailErr] = useState(false)
  const [usernameErr, logUsernameErr] = useState(false)
  const [fullNameErr, logFullNameErr] = useState(false)
  const [phoneNumberErr, logPhoneNumberErr] = useState(false)

  const [passErr, logPassErr] = useState(false)

  const [userData, setUserData] = useState({})

  const nameEl = useRef(null)
  const phoneEl = useRef(null)
  const mailEl = useRef(null)
  const usernameEl = useRef(null)
  const passwordEl = useRef(null)

  const emailValidation = (e) => {
    let value = e.target.value || ""
    value = value.trim()
    setUserData({
      ...userData,
      email: value,
    })

    if (value !== "") {
      logEmailErr(!emailValidate(value))
    } else {
      logEmailErr(false)
    }
  }

  const phoneNumberValidate = (e) => {
    let value = e.target.value || ""
    value = value.trim()
    setUserData({
      ...userData,
      phone: value,
    })

    if (value !== "") {
      console.log(!phoneValidate(value))
      logPhoneNumberErr(!phoneValidate(value))
    } else {
      logPhoneNumberErr(false)
    }
  }

  const usernameValidation = (e) => {
    let value = e.target.value || ""
    value = value.trim()
    setUserData({
      ...userData,
      username: value,
    })

    if (value !== "") {
      logUsernameErr(!usernameValidate(value))
    } else {
      logUsernameErr(false)
    }
  }

  const fullNameValidation = (e) => {
    let value = e.target.value || ""
    value = value.trim()
    setUserData({
      ...userData,
      fullName: value,
    })

    if (value !== "") {
      logFullNameErr(!nameValidate(value))
    } else {
      logFullNameErr(false)
    }
  }

  const passValidation = (e) => {
    let value = e.target.value || ""
    value = value.trim()
    setUserData({
      ...userData,
      password: value,
    })

    if (value !== "") {
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
    if (
      !emailErr &&
      !usernameErr &&
      !fullNameErr &&
      !passErr &&
      !phoneNumberErr
    ) {
      return true
    } else return false
  }

  const closeForm = () => {
    setCreateForm(false)
    logEmailErr(false)
    logPassErr(false)
    logFullNameErr(false)
    logPhoneNumberErr(false)
    logUsernameErr(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!checkValidate()) return alert("Vui lòng điền thông tin hợp lệ!")

    const fullName = nameEl.current.value.trim()
    const phone = phoneEl.current.value.trim()
    const email = mailEl.current.value.trim()
    const username = usernameEl.current.value.trim()
    const password = passwordEl.current.value.trim()
    const text = toChar(fullName)

    const data = {
      fullName,
      email,
      phone,
      username,
      password,
      text,
    }

    dispatch(toggleLoading(true))
    createUser(data)
      .then((res) => {
        if (res.data && res.data.status) {
          setCreateForm(false)
          alert(res.data.message)
          dispatch({
            type: "CREATE_USER",
            payload: res.data.staff,
          })
        } else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        alert('Error: ' + err)
      })
      .then(() => {
        dispatch(toggleLoading(false))
        dispatch(getAllUsersAsync({}))
      })
  }

  return (
    <>
      {(createForm && (
        <div id="staff-create">
          <div className="create-container">
            <form onSubmit={handleSubmit} className="create-form">
              <span onClick={closeForm} className="close">
                <i className="fas fa-times"></i>
              </span>
              <h4>Thêm người dùng</h4>
              <div className="form-container container">
                <div className="create-name">
                  <label htmlFor="create_name">Họ Tên: </label>
                  <input
                    onChange={fullNameValidation}
                    required
                    className={fullNameErr ? "error" : ""}
                    ref={nameEl}
                    id="create_name"
                  />
                </div>
                <div className="create-phone">
                  <label htmlFor="create_phone">SĐT: </label>
                  <input
                    onChange={phoneNumberValidate}
                    className={phoneNumberErr ? "error" : ''}
                    required
                    ref={phoneEl}
                    id="create_phone"
                  />
                </div>
                <div className="create-mail">
                  <label htmlFor="create_mail">Email: </label>
                  <input
                    onChange={(e) => emailValidation(e)}
                    className={emailErr ? "error" : ""}
                    required
                    ref={mailEl}
                    id="create_mail"
                  />
                </div>
                <div className="create-username">
                  <label htmlFor="create_username">Tài khoản: </label>
                  <input
                    onChange={(e) => usernameValidation(e)}
                    className={usernameErr ? "validate-error" : ""}
                    required
                    ref={usernameEl}
                    id="create_username"
                  />
                </div>
                <div className="create-password">
                  <label htmlFor="create_password">Mật khẩu: </label>
                  <input
                    onChange={passValidation}
                    className={passErr ? "error" : ""}
                    required
                    ref={passwordEl}
                    id="create_password"
                  />
                </div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )) ||
        null}
    </>
  )
}

export default Create
