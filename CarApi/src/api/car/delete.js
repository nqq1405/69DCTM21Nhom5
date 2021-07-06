const CarModel = require('../../models/car')
const removeImage = require('../../utils/removeImage')

const remove = (req, res, next) => {
    const { _id } = req.params
    const { userRole } = req
    const data = req.body

    if (userRole !== 'admin' && userRole !== 'staff') {
        req.err = 'Bạn không có quyền'
        return next('last')
    }

    data.images = data.images?.split(' ') || []

    CarModel.deleteOne({
        _id
    })
        .then(resData => {
            if (resData) {
                res.json({
                    status: true,
                    message: 'Xóa xe thành công!'
                })
                
                if (data.images?.length > 0) {
                    data.images.forEach(currentImage => {
                        removeImage(currentImage.publicId, {}, (err, result) => {
                            if (err) {
                                console.log('Lỗi xóa ảnh!')
                            }
                            if (result) {
                                console.log('Xóa ảnh thành công')
                            }
                        })
                    })
                }
            } else {
                req.err = "Không thể xóa"
                next('last')
            }
        })
        .catch(err => {
            req.err = `Lỗi xóa xe! + ${err}`
            next('last')
        })

}

module.exports = remove