const express = require('express')
const router = express.Router()

const wrapper = require('../../helpers/wrapper')
const method = require('../../controllers/orders/index')

router.get('/orders', wrapper(method.getOrders))

module.exports = router
