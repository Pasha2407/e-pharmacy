const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const { userModel } = require('../../models/users')
const newError = require('../../helpers/newError')

async function login(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if (user === null) {
        throw newError(401, 'Email or password is wrong')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch === false) {
        throw newError(401, 'Email or password is wrong')
    }

    if (user.verify === false) {
        throw newError(403, 'No verification')
    }

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    )

    await userModel.findByIdAndUpdate(user._id, { token })

    res.status(200).send({ email, token })
}

module.exports = login
