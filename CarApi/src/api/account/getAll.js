const AccountModel = require('../../models/account')

const getAll = (req, res, next) => {

  AccountModel.find({})
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          message: 'Lấy người dùng thành công!',
          staffs: resData,
        })
      } else {
        req.err = 'Lỗi lấy người dùng!'
        next('last')
      }
    })
    .catch(err => {
      req.err = `Lỗi lấy người dùng! + ${err}`
      next('last')
    })
}

module.exports = getAll