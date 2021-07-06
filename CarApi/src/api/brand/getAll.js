const BrandModel = require('../../models/brand')

const getAll = (req, res, next) => {
  BrandModel.find({})
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          message: 'Lấy hãng xe thành công!',
          brands: resData
        })
      } else {
        req.err = 'Lấy hãng xe thất bại!'
        next('last')
      }
    })
}

module.exports = getAll