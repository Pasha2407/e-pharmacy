const express = require('express')
const router = express.Router()

const wrapper = require('../../helpers/wrapper')
const method = require('../../controllers/products/index')

router.get('/', wrapper(method.getProducts))

module.exports = router
