const bcrypt = require('bcrypt')

const { userModel } = require('../../models/users')
const newError = require('../../helpers/newError')

async function register(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if (user !== null) {
        throw newError(409)
    }
    const passwordHash = await bcrypt.hash(password, 8)

    await userModel.create({ email, password: passwordHash })

    res.status(201).send({ email })
}

module.exports = register
