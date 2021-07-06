const AccountModel = require('../../models/account')

const create = (req, res, next) => {
  const data = req.body
  const { username, password } = data

  if (!username || !password) {
    req.err = 'Thông tin không hợp lệ!'
    return next('last')
  }

  AccountModel.findOne({
    username: data.username
  })
    .then(resData => {
      if (resData) {
        req.err = 'Người dùng đã tồn tại!'
        next('last')
      } else {
        const newAccount = AccountModel(data)

        newAccount.save(err => {
          if (err === null) {
            res.json({
              status: true,
              message: 'Tạo Người dùng thành công!',
              staff: newAccount
            })
          } else {
            req.err = `Đăng kí thất bại! + ${err}`
            next('last')
          }
        })

      }
    })
}

module.exports = create