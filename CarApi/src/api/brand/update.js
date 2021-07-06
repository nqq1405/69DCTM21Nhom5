const BrandModel = require('../../models/brand')

const update = (req, res, next) => {
  const { _id } = req.params
  const data = req.body
  const { userRole } = req

  if (userRole !== 'admin' && userRole !== 'staff') {
    req.err = 'Bạn không có quyền!'
    return next('last')
  }

  BrandModel.findOneAndUpdate({
    _id: _id
  }, data, { new: true})
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          message: "Cập nhật hãng thành công!",
          newBrand: resData
        })
      } else {
        req.err = 'Lỗi cập nhật hãng!'
        next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi cập nhật hãng! ' + err
      next('last')
    })

}

module.exports = update