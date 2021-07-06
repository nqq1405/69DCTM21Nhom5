  const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const create = require('../api/car/create')
const getAll = require('../api/car/getAll')
const getOne = require('../api/car/getOne')
const update = require('../api/car/update')
const remove = require('../api/car/delete')

router.delete('/:_id', auth, remove)
router.put('/:_id', auth, update)
router.get('/:_id', getOne)
router.post('/', auth, create)
router.get('/', getAll)

module.exports = router
