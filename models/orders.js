const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        photo: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        products: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        order_date: {
            type: String,
            required: true,
        }
    },
    { versionKey: false }
)

const orderModel = mongoose.model('Order', orderSchema)

module.exports = orderModel