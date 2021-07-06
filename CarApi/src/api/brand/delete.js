const BrandModel = require('../../models/brand')

const remove = (req, res, next) => {
  const { _id } = req.params
  const { userRole } = req

  if (userRole !== 'admin' && userRole !== 'staff') {
    req.err = 'Bạn không có quyền!'
    return next('last')
  }
  
  BrandModel.deleteOne({
    _id: _id
  })
    .then(resData => {
      if (resData) {
        res.json({
          status: true
        })
      } else {
        req.err = "Không thể xóa"
        next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi xóa hãng! ' + err
      next('last')
    })

}

module.exports = remove