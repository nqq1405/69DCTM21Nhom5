const BrandModel = require('../../models/brand')
const toSlug = require('../../utils/toSlug')

const create = (req, res, next) => {
  const data = req.body
  const { userRole } = req

  if (userRole !== 'admin' && userRole !== 'staff') {
    req.err = 'Bạn không có quyền!'
    return next('last')
  }

  BrandModel.findOne({
    slug: toSlug(data.name)
  })
    .then(resData => {
      if (resData) {
        res.json({
          status: false,
          message: 'hãng xe đã tồn tại!',
        })
      } else {
        const newBrand = new BrandModel(data)
        newBrand.save(err => {
          if (err === null) {
            res.json({
              status: true,
              message: 'Tạo hãng xe thành công!',
              newBrand: newBrand
            })
          } else {
            req.err = 'Lỗi tạo hãng xe: ' + err
            next('last')
          }
        })
      }
    })
}

module.exports = create