const express = require('express')
const router = express.Router()

const validateToken = require('../../middlewares/validateToken')

const validateSchema = require('../../middlewares/validateSchema')
const { userJoiSchema } = require('../../models/users')

const wrapper = require('../../helpers/wrapper')
const method = require('../../controllers/users/index')

router.post('/register', validateSchema(userJoiSchema), wrapper(method.register))

router.post('/login', validateSchema(userJoiSchema), wrapper(method.login))

router.get('/logout', validateToken, wrapper(method.logout))

router.get('/user-info', validateToken, wrapper(method.current))

module.exports = router
