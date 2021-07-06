const express = require('express')
const create = require('../api/brand/create')
const remove = require('../api/brand/delete')
const getAll = require('../api/brand/getAll')
const update = require('../api/brand/update')
const auth = require('../middlewares/auth')
const router = express.Router()

router.delete('/:_id', auth, remove)
router.put('/:_id', auth, update)
router.post('/', auth, create)
router.get('/', getAll)

module.exports = router