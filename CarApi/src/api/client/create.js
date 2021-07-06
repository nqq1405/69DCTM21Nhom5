const UserModel = require('../../models/client')

const create = (req, res, next) => {
  const data = req.body

  const user = UserModel(data)

  user.save(err => {
    if (err === null) {
      res.json({
        status: true,
        message: 'Tạo Người dùng thành công!',
        newClient: user
      })
    } else {
      req.err = `Đăng kí thất bại! + ${err}`
      next('last')
    }
  })

}
module.exports = create