const CarModel = require('../../models/car')

const getOne = (req, res, next) => {
    const { _id } = req.params

    CarModel.findOne({ _id })
        .then(resData => {
            if (resData) {
                res.json({
                    status: true,
                    car: resData
                })
            } else {
                req.err = 'Không tìm thấy xe!'
                next('last')
            }
        })
}

module.exports = getOne