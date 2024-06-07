const orderModel = require("../../models/orders");

async function getOrders(req, res) {
    const { userName, page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;

    const filter = {};
    if (userName) {
        filter.name = { $regex: new RegExp(userName, "i") };
    }

    const result = await orderModel.find(filter);

    res.status(200).send({
        result: result.splice(skip, limit),
    });
}

module.exports = getOrders;