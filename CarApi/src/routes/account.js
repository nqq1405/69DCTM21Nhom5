const express = require('express')
const create = require('../api/account/create')
const auth = require('../middlewares/auth')
const remove = require('../api/account/delete')
const getAll = require('../api/account/getAll')
const router = express.Router()

router.delete('/:_id', auth, remove)
router.post('/register', create)
router.get('/', auth, getAll)
module.exports = router