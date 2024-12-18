const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

const usersRouter = require('./routes/api/users')
const ordersRouter = require('./routes/api/orders')
const productsRouter = require('./routes/api/products')

app.use('/api/user', usersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/products', productsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

const errorResponses = {
  400: { status: 400 },
  401: { status: 401 },
  403: { status: 403 },
  404: { status: 404 },
  409: { status: 409 }
};

app.use((err, req, res, next) => {
  if (err instanceof Error && err.status && errorResponses[err.status]) {
    const { status } = errorResponses[err.status];
    res.status(status).json({ message: err.message })
  } else {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = app
