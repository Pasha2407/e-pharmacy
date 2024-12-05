const productModel = require('../../models/products')

async function getProducts(req, res) {
    const { productName, page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;

    const filter = {};
    if (productName) {
        filter.name = { $regex: new RegExp(productName, "i") };
    }

    const result = await productModel.find(filter);

    res.status(200).send({
        result: result.splice(skip, limit),
    });
}

module.exports = getProducts;