import { useRef } from "react"
import { useDispatch } from "react-redux"
import { createClientAsync } from "../../redux/actions/clients.actions"

const Contact = () => {
  const dispatch = useDispatch()

  const fullNameEl = useRef(null)
  const addressEl = useRef(null)
  const phoneEl = useRef(null)
  const emailEl = useRef(null)
  const messageEl = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const fullName = fullNameEl?.current?.value
    const address = addressEl?.current?.value
    const phone = phoneEl?.current?.value
    const email = emailEl?.current?.value
    const message = messageEl?.current?.value
    if (!fullName || !address || !phone || !email || !message)
      return alert('Vui lòng nhập thông tin hợp lệ!')
      
    let data = {
      fullName, address, phone, email, message
    }

    dispatch(createClientAsync(data))
  }

  return (
    <div className="containercontact">
      <div className="contact-box">
        <div className="left">
        </div>
        <div className="right">
          <h2>Liên hệ với chúng tôi</h2>
          <form action='/'>
            <input ref={fullNameEl} type="text" required className="field" placeholder="Tên" />
            <input ref={addressEl} type="text" required className="field" placeholder="Địa chỉ" />
            <input ref={emailEl} type="email" required className="field" placeholder="Email" />
            <input ref={phoneEl} type="text" required className="field" placeholder="Số điện thoại" />
            <textarea ref={messageEl} className="field" required placeholder="Lời nhắn" />
            <button type='submit' onClick={handleSubmit} className="btn">Gửi</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact