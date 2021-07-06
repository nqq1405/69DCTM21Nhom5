const AccountModel = require('../../models/account')
const removeImage = require('../../utils/removeImage')

const remove = (req, res, next) => {
    const { userRole } = req
    const { _id } = req.params

    if (userRole === 'admin') {
        AccountModel.deleteOne({
            _id: _id
        })
            .then(resData => {
                if (resData) {
                    res.json({
                        status: true,
                        message: "Xóa người dùng thành công!"
                    })

                } else {
                    req.err = "Không thể xóa"
                    next('last')
                }
            })
            .catch(err => {
                req.err = `Lỗi xóa người dùng! + ${err}`
                next('last')
            })
    } else {
        req.err = 'Bạn không có quyền!'
        next('last')
    }
}

module.exports = remove