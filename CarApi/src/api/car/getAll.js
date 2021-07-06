const CarModel = require('../../models/car')

const getAll = (req, res, next) => {
  const { brand, search } = req.query

  let query = {}
  if (brand) query["brand"] = brand
  if (search && search !== 'null') query["text"] = { $regex: search, $options: 'gi' }

  CarModel.find(query)
    .populate('brand')
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          message: 'Lấy xe thành công!',
          cars: resData,
        })
      } else {
        req.err = 'Lỗi lấy xe!'
        next('last')
      }
    })
    .catch(err => {
      req.err = `Lỗi lấy xe! + ${err}`
      next('last')
    })
}

module.exports = getAll