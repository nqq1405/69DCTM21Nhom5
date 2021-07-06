const CarModel = require('../../models/car')
const uploadImage = require('../../utils/uploadImage')
const removeImage = require('../../utils/removeImage')

const update = (req, res, next) => {
  const { _id } = req.params
  const data = req.body

  const { userRole } = req

  if (data.currentImages && typeof data.currentImages === 'string') {
    try {
      data.currentImages = JSON.parse(data.currentImages)
      if (!(data.currentImages?.length > 0))
        data.currentImages = []
    } catch {
      data.currentImages = []
    }
  } else {
    data.currentImages = []
  }

  if (userRole !== 'admin' && userRole !== 'staff') {
    req.err = 'Bạn không có quyền'
    return next('last')
  }

  const { deletedImages, newImages } = data
  let deleteIds = deletedImages?.length > 0 && deletedImages.split(' ') || []

  if (deleteIds?.length > 1) {
    deleteIds.forEach(del => {
      removeImage(del, {}, (error, result) => {
        if (error) {
          console.log('Lỗi xóa ảnh!' + del)
        }
        if (result) {
          console.log('Xóa ảnh thành công')
        }
      })
    })
  }

  let newImagesArr = newImages?.split(' ') || []

  let promises = []
  let newUploadedImages = []

  if (newImagesArr?.length > 0) {
    newImagesArr.forEach(currentImage => {
      if (currentImage) {
        promises.push(
          new Promise((resolve, reject) => {
            uploadImage(currentImage, {}, (err, result) => {
              if (err) {
                req.err = 'Lỗi upload ảnh!'
                reject()
              }

              if (result && result.url) {
                newUploadedImages.push({
                  url: result.url,
                  publicId: result.public_ids || result.public_id
                })
                resolve()
              }
            })
          })
        )
      }
    })
  }

  Promise.all(promises)
    .then(() => {
      data.currentImages.forEach(item => {
          newUploadedImages.push(item)
      })
      CarModel.findOneAndUpdate({
        _id
      }, {
        ...data,
        images: newUploadedImages
      }, { new: true })
        .then(resData => {
          if (resData) {
            res.json({
              status: true,
              message: 'Cập nhật thành công!',
              newCar: resData
            })
          } else {
            req.err = 'Lỗi cập nhật!'
            return next('last')
          }
        })
        .catch(err => {
          req.err = 'Lỗi cập nhật! ' + err
          next('last')
        })
    })
    .catch(err => {
      req.err = 'Lỗi cập nhật! ' + err
      next('last')
    })

}

module.exports = update