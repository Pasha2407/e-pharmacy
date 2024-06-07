async function current(req, res) {
    res.status(200).send({
        email: req.user.email,
    })
}

module.exports = current
