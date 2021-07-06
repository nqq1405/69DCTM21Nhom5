const ClientModel = require('../../models/client')

const getAll = (req, res, next) => {
  ClientModel.find({})
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          message: 'Lấy khách hàng thành công!',
          clients: resData
        })
      } else {
        req.err = 'Lấy khách hàng thất bại!'
        next('last')
      }
    })
}

module.exports = getAll