const CarModel = require('../../models/car')
const uploadImage = require('../../utils/uploadImage')

const create = (req, res, next) => {
  const data = req.body
  const { userRole } = req

  data.images = data.images?.split(' ') || []

  data.images = data.images?.length > 0 && data.images.reduce((newImages, currentItem) => {
    if (!currentItem || currentItem === 'null' || currentItem === 'undefined')
      return newImages
    return [
      ...newImages,
      currentItem
    ]
  }, []) || []

  if (userRole !== 'admin' && userRole !== 'staff') {
    req.err = 'Bạn không có quyền!'
    return next('last')
  }

  CarModel.findOne({
    text: data.text
  })
    .then(resData => {
      if (resData) {
        req.err = 'Xe đã tồn tại!'
        next('last')
      } else {
        let uploadedImages = []

        if (data.images?.length > 0 && data.images !== 'null') {
          let promises = []
          data.images.forEach(currentImage => {
            promises.push(
              new Promise((resolve, reject) => {
                uploadImage(currentImage, {}, (err, result) => {
                  if (err) {
                    reject(err)
                  }

                  if (result && result.url) {
                    uploadedImages.push({
                      url: result.url,
                      publicId: result.public_ids || result.public_id
                    })
                    resolve({
                      url: result.url,
                      publicId: result.public_ids || result.public_id
                    })
                  }
                })
              })
            )
          })
          
          Promise.all(promises)
            .then(() => {
              console.log('done')
              const newData = {
                ...data,
                images: uploadedImages
              }

              const newCar = new CarModel(newData)
              newCar.save(err => {
                if (err === null) {
                  res.json({
                    status: true,
                    newCar: newCar,
                    message: 'Thêm xe thành công!'
                  })
                } else {
                  req.err = `Thêm xe thất bại! + ${err}`
                  next('last')
                }
              })
            })
            .catch(err => {
              console.log(err.message)
              req.err = `Lỗi ảnh! + ${err}`
              // next('last')
            })
            .then(() => {
              console.log('end')
            })
        } else {
          const newData = {
            ...data,
            images: []
          }
          const newCar = new CarModel(newData)
          newCar.save(err => {
            if (err === null) {
              res.json({
                status: true,
                newCar: newCar,
                message: 'Thêm xe thành công!'
              })
            } else {
              req.err = `Thêm xe thất bại! + ${err}`
              next('last')
            }
          })
        }
      }
    })
    .catch(err => {
      req.err = `Thêm Xe thất bại! + ${err}`
      next('last')
    })
}

module.exports = create