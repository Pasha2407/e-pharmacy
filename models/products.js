const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        suppliers: {
            type: String,
            required: true,
        },
        stock: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        }
    },
    { versionKey: false }
)

const productModel = mongoose.model('Product', productSchema)

module.exports = productModel